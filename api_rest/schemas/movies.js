import * as z from 'zod';

// {
//   "id": "dcdd0fad-a94c-4810-8acc-5f108d3b18c3",
//   "title": "The Shawshank Redemption",
//   "year": 1994,
//   "director": "Frank Darabont",
//   "duration": 142,
//   "poster": "https://i.ebayimg.com/images/g/4goAAOSwMyBe7hnQ/s-l1200.webp",
//   "genre": ["Drama"],
//   "rate": 9.3
// },

export const movieSchema = z.object({
  title: z.string().min(1, "Title is required"), 
  year: z.number().int().min(1888, "Year must be a valid year").max(2026),
  director: z.string().min(1, "Director is required"),
  duration: z.number().int().min(0).max(600, "Duration must be between 0 and 600 minutes"),
  poster: z.url(),
  genre: z.array(
    z.enum([
        "Action",
        "Adventure",
        "Animation",
        "Biography",
        "Crime",
        "Drama",
        "Fantasy",
        "Romance",
        "Sci-Fi"
        ],
        {
          errorMap: (issue, ctx) => {
            if (issue.code === z.ZodIssueCode.invalid_enum_value) {
              return { message: `Invalid genre: ${issue.received}` };
            }
            return { message: ctx.defaultError };
          }
        })),
  rate: z.number().min(0).max(10, "Rate must be between 0 and 10")
});

export function validateMovie(data) {
  const result = movieSchema.safeParse(data);
  return result;
}

export function validateUpdate(data) {
  return movieSchema.partial().safeParse(data);
}
