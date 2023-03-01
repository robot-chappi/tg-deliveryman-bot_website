const filterItemCategory = (data, findCategory) => {
    return data.filter((newVal) => {
        return newVal.category.title === findCategory;
    });
};

export default filterItemCategory;