import {catalogData} from "./mockdata";

function getMealPlan(userData) {
  try {
    const favoriteCategory = userData.favoriteCategory;
    const unlovedIngredients = userData.unlovedIngredients;
    const favoriteProducts = userData.favoriteProducts;
    const products = userData.products;

    // console.log(favoriteCategory);
    // console.log(unlovedIngredients);
    // console.log(favoriteProducts)
    // console.log(products)

    console.log(2222222)
    console.log(unlovedIngredients)

    let mealPlan = {
      "Понедельник": [],
      "Вторник": [],
      "Среда": [],
      "Четверг": [],
      "Пятница": [],
      "Суббота": [],
      "Воскресенье": []
    };

    let meal = [...favoriteProducts];
    console.log(products)
    let morning = [];
    let afternoon = [];
    let night = [];
    let snack = [];
    for (let product in products) {
      if (products[product]['category']['id'] === Number(favoriteCategory)) {
        meal.push(products[product])
      }
    }


    const myArrayFiltered = meal.filter((el) => {
      return unlovedIngredients.some((f) => {
        // console.log(11111111)
        // console.log(el.ingredients)
        return el.ingredients.some((i) => {
          return f.ingredient.id === i.id;
        })
      });
    });

    //console.log(myArrayFiltered)

    let mealFiltered = meal.filter(x => !myArrayFiltered.includes(x));

    //console.log(mealFiltered)

    for (let product in mealFiltered) {
      if (meal[product]['type']['id'] === 1) {
        morning.push(meal[product])
      }
      if (meal[product]['type']['id'] === 2) {
        afternoon.push(meal[product])
      }
      if (meal[product]['type']['id'] === 3) {
        night.push(meal[product])
      }
      if (meal[product]['type']['id'] === 4) {
        snack.push(meal[product])
      }
    }

    let days = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
    for (let day of days) {
      let randomIndexMorning = Math.floor(Math.random() * morning.length);
      let randomIndexAfternoon = Math.floor(Math.random() * afternoon.length);
      let randomIndexNight = Math.floor(Math.random() * night.length);
      let randomIndexSnack = Math.floor(Math.random() * snack.length);
      mealPlan[day].push(morning[randomIndexMorning]);
      mealPlan[day].push(afternoon[randomIndexAfternoon]);
      mealPlan[day].push(night[randomIndexNight]);
      mealPlan[day].push(snack[randomIndexSnack]);
    }

    let price = {price: 0};
    for (let day of days) {
      let priceOneDay = mealPlan[day].reduce(function(previousValue, currentValue) {
        return {
          price: previousValue.price + currentValue.price,
        }
      });

      price['price'] = price['price'] + priceOneDay.price
    }
    mealPlan.price = price

    return mealPlan;
  } catch (e) {
    console.log(e);
  }
}

export default getMealPlan;
