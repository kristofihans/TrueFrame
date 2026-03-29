import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'category',
  title: 'Categorie Portofoliu',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titlu',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descriere',
      type: 'text',
    }),
  ],
})
