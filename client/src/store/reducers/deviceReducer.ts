const initialState = {
    types: [
        {id: 1, name: 'Холодильники'},
        {id: 2, name: 'Смартфоны'},
    ],
    brands: [
        {id: 1, name: 'Samsung'},
        {id: 2, name: 'Apple'},
    ],
    devices: [
        {id: 1, name: 'Iphone 12 pro', price: 25000, rating: 5, img: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-blue-hero?wid=470&hei=556&fmt=png-alpha&.v=1604021661000'}
    ],
}

export const deviceReducer = (state = initialState, action: any) => {
    switch (action.type) {
        default:
            return state
    }
}