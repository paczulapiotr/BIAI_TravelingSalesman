export default class DnaFactory {
  static get(genes, fitness) {
    return {
      genes,
      fitness,
    };
  }
}
