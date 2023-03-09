import { RDFField } from "radix-declarative-form";
import { useNearPrice } from '@mintbase-js/react';
import { accountExists } from '@mintbase-js/rpc';

import { parseUsableBasisPointAdjustedRoyalty } from "./useFormSubmit";

export type FormFields = {
  title: string;
  description: string;
  photographer: string;
  category: string;
  media: File;
  url: string;
  license: string;
  price: number;
  royalties: {
    percent: number,
    account: string
  }[];
};

const DEFAULT_RM_LICENSE = 'https://arweave.net/L_khfy3u6i7ltXrgXOeSWnzrpebxOfZURHT3WDyzHRI';

type UseFormFieldsReturn = {
  fields: RDFField<FormFields>[]
}

export const useFormFields = (): UseFormFieldsReturn => {
  const { nearPrice } = useNearPrice();
  return {
    fields: [
      {
        type: "text",
        name: "title",
        label: "Title of Creative",
        options: {
          required: "Give the work a title",
        },
      },
      {
        type: "media",
        name: "media",
        label: "Upload Image Preview",
        helpText: "Images must be less than 30MB",
      },
      {
        type: "text",
        name: "photographer",
        label: "Photographer",
        options: {
          required: 'Photographer is required'
        }
      },
      {
        type: "select",
        name: "category",
        label: "Category",
        placeholder: 'Select a category...',
        options: {
          required: 'Category is required'
        },
        choices: [
          'Basketball',
          'Surfing',
          'Nature',
          'Travel',
        ]
      },
      {
        type: "text",
        name: "url",
        label: "High Resolution / Download URL",
        helpText: 'Specify the URL where the full asset can be downloaded',
      },
      {
        type: "multiline",
        name: "description",
        label: "Describe this work",
        placeholder: 'An optional description'
      },
      {
        type: "select",
        name: "license",
        label: "License Type",
        default: DEFAULT_RM_LICENSE,
        choices: [
          {
            label: 'Rights Managed',
            value: DEFAULT_RM_LICENSE
          }
        ]
      },
      {
        type: "text",
        name: "price",
        label: "Price in NEAR",
        default: '1',
        observe: true,
        HelpText: (state?: Partial<FormFields>) => {
          if (state?.price) {
            return <span>~ ${(state.price * nearPrice).toFixed(2)} USD</span>
          }
          return <span>Enter a price to see USD equivalent</span>
        },
        options: {
          required: 'You must specify a price in NEAR'
        }
      },
      {
        type: 'table',
        name: 'royalties',
        label: 'Revenue sharing on sales (optional)',
        // observe: true, // allows enabling help text to update
        helpText: 'Share up to 50% of future sales with NEAR accounts',
        addItemButtonText: 'Add another account',
        observe: true,
        columns: [
          {
            key: 'percent',
            label: '%',
            type: 'number',
            placeholder: '0.5'
          },
          {
            key: 'account',
            label: 'NEAR Account',
            placeholder: 'your.account.near'
          }
        ],
        options: {
          validate: async (value: { account: string, percent: string | number }[] = []) => {
            // check sum is not more than 50%
            const totalShares = value.reduce((sum: number, split: any) => sum + Number(split.percent), 0)
            if (totalShares > 0.5) {
              return 'Total revenue shares must be less than 50%'
            }

            // validate accounts exist
            const validations = await Promise.all(
              value.map(async v => ({
                account: v.account,
                exists: await accountExists(v.account)
              }))
            )

            const nonExistingAccounts = validations.filter(v => !v.exists)
            if (nonExistingAccounts.length > 0) {
              return `NEAR account(s) ${nonExistingAccounts.map(v => v.account).join(', ')} do not exist.`
            }

            return true
          }
        }
      }
    ]
  }
}
