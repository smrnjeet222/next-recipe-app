export default {
  name: "recipe",
  title: "Recipe",
  type: "document",
  fields: [
    {
      name: "name", title: "Recipe Name", type: "string"
    },
    {
      name: "slug", title: "Slug", type: "slug",
      option: {
        source: "name",
        maxLength: 96
      }
    },
    {
      name: "chef", title: "Chef", type: "reference",
      to: {
        type: "chef"
      }
    },
    {
      name: "mainImage",
      title: "Recipe Main Image",
      type: "image",
      options: { hotspot: true }
    },
    {
      name: "ingredients", title: "Ingredients", type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "ingredient", title: "Ingredient", type: "reference",
              to: [{
                type: "ingredient"
              }]
            },
            {
              name: "wholeNumber", title: "Whole Number", type: "number",
            },
            {
              name: "fraction", title: "Fraction", type: "string",
              options: {
                list: ["1/2", "1/3", "1/4", "2/3", "3/4"]
              }
            },
            {
              name: "unit", title: "Unit", type: "string",
              options: {
                list: ["grams", "cup", "Tbsp", "tsp."]
              }
            }
          ],
          preview: {
            select: {
              title: "ingredient.name",
              name: "ingredient.name",
              media: "ingredient.image",
              wholeNumber: "wholeNumber",
              fraction: "fraction",
              unit: "unit"
            },
            prepare(props) {
              const {
                title, media,
                wholeNumber = '(No whole number set)',
                fraction = '(No fraction set)',
                unit = "(No unit set)"
              } = props;

              return {
                title,
                subtitle: `${wholeNumber} ${fraction} ${unit}`,
                media,
              }
            }
          }
        }
      ]
    },
    {
      name: "instructions", title: "Instructions", type: 'array',
      of: [
        {
          title: "Block",
          type: "block",
          styles: [
            { title: "normal", value: "normal" }
          ],
          lists: []
        }
      ]
    }
  ]
}