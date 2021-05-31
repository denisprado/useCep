export const getDataFromCep = (zipcode: string) =>
  fetch(`https://viacep.com.br/ws/${zipcode}/json/`)
    .then(response => response.json())
    .then(endereco => endereco);

export default getDataFromCep;
