/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

console.log('Happy hacking :)')
const appNode = document.querySelector('#app');

appNode.addEventListener("click", (event) => {
    if(event.target.nodeName === 'H2'){
        window.alert("Hola");
    }
})

const baseURL = "https://platzi-avo.vercel.app";

//Intl
// 1-> formato a fechas
// 2-> formato a monedas

const formatPrice = (price) => {
    const newPrice = new window.Intl.NumberFormat('en-EN', {
        style: 'currency',
        currency: 'USD'
    }).format(price);

    return newPrice;
};

window
    .fetch(`${baseURL}/api/avo`)
    // procesar la respuesta y convertirla en JSON
    .then((respuesta) => respuesta.json())
    // Json -> Data -> Renderizar info browser
    .then((responseJSON) => {
        const allItems = [];
        responseJSON.data.forEach((item) => {
            // crear imagen
            const image = document.createElement("img");
            image.className = "h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6";
            image.src = `${baseURL}${item.image}`;

            // crear titulo
            const title = document.createElement("h2");
            title.className = 'text-lg';
            title.textContent = item.name;

            // crear precio
            const price = document.createElement("div");
            title.className = 'text-gray-600';
            price.textContent = formatPrice(item.price);

            const priceAndTitle = document.createElement("div");
            priceAndTitle.className = 'text-center md:text-left';
            priceAndTitle.append(title, price);

            // crear contenedor
            const card = document.createElement('div')
            card.className = 'md:flex bg-white rounded-lg p-6 hover:bg-gray-300';
            card.append(image, priceAndTitle)
            console.log(card)

            allItems.push(card);

            console.log(item.name);
        });
        appNode.append(...allItems);
    })