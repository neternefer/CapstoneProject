const showCard = () => {
    //Show and hide generated travel card
    const formCard = document.querySelector('.form-article');
    const travelCard = document.querySelector('.hidden-display');
    if(travelCard.style.display === '' || travelCard.style.display === 'none') {
        formCard.style.display = 'none';
        travelCard.style.display ='block';
        //Attach close icon event listener to close travel card
        document.querySelector('.close').addEventListener('click', Client.showCard);
    } else {
        formCard.style.display ='flex';
        travelCard.style.display ='none';
    }
};

export {
    showCard
}