let listGlobal = [1];

export default listGlobal;

export const getListGlobal = () => {
    return listGlobal;
};

export const setListGlobal = (value) => {
    listGlobal = value;
};
