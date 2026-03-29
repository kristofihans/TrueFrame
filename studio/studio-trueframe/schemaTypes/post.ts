import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Articol Blog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titlu',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data Publicării',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagine Copertă',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'summary',
      title: 'Rezumat Card',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'body',
      title: 'Conținut',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
})
