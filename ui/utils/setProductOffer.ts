export const  setProductOffer = (price: number, offer_percent: number)=> {
    return price -  price * (offer_percent / 100);
}