import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'album',
  title: 'Portofoliu Album',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titlu Album',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categorie',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagine Copertă',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descriere Scurtă (Card)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'gallery',
      title: 'Galerie Foto',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Afișează pe pagina principală',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
