const series = `
type Series {
  id: ID
  seriesName: String
  year: Int
  rating: Rating
}
enum Rating {
  ONE
  TWO
  THREE
}
input SeriesInput {
  seriesName: String
  year: Int
  rating: Rating
}
type Query {
  getSeries: [Series]
}
type Mutation {
  addSeries(series: SeriesInput): Series
}
`;
module.exports = series;
