export const setListOfIngredientsAndQuantity = (type, setQuanitity, setIngredients) => {
  const arrayIngredients = [];
  const arrayQuantity = [];
  const number = 20;
  for (let index = 1; index < number; index += 1) {
    if (type[`strIngredient${index}`] !== ''
      && type[`strIngredient${index}`] !== null
      && type[`strIngredient${index}`] !== undefined) {
      arrayIngredients.push(type[`strIngredient${index}`]);
    }
    if (type[`strMeasure${index}`] !== null
    && type[`strIngredient${index}`] !== undefined) {
      arrayQuantity.push(type[`strMeasure${index}`]);
    }
  }
  setQuanitity(arrayQuantity);
  setIngredients(arrayIngredients);
};

// https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
export const copyToClipBoard = async (copyMe, setCopySuccess) => {
  try {
    await navigator.clipboard.writeText(copyMe);
    setCopySuccess('Link copiado!');
  } catch (err) {
    setCopySuccess('Failed to copy!');
  }
};

export const handleIngredient = (ingredient, id, type, setCheckIngredients) => {
  const progressRecipesToAddIngredient = JSON.parse(localStorage
    .getItem('inProgressRecipes'));
  const verifyIngredient = progressRecipesToAddIngredient[type][id] !== undefined
  && progressRecipesToAddIngredient[type][id].some((item) => item === ingredient);

  if (!verifyIngredient) {
    const newProgressRecipe = {
      ...progressRecipesToAddIngredient,
      [type]: {
        ...progressRecipesToAddIngredient[type],
        [id]: progressRecipesToAddIngredient[type][id] === undefined
          ? [ingredient]
          : [...progressRecipesToAddIngredient[type][id], ingredient],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newProgressRecipe));
    setCheckIngredients(newProgressRecipe);
  } else {
    const newProgressRecipe = {
      ...progressRecipesToAddIngredient,
      [type]: {
        ...progressRecipesToAddIngredient[type],
        [id]: progressRecipesToAddIngredient[type][id]
          .filter((item) => item !== ingredient),
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newProgressRecipe));
    setCheckIngredients(newProgressRecipe);
  }
};
