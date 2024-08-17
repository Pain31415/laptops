import { addHeader } from "./src/js/addHeader.js";
import { addToCart, cart } from "./src/js/cart.js";
import { laptops } from "./src/js/db.js";
import { filterGoods } from "./src/js/filter.js";
import { closeCart, openCart } from "./src/js/open_close_cart.js";
import { renderGoods } from "./src/js/renderGoods.js";
import { renderSelect } from "./src/js/renderSelect.js";

addHeader()
openCart()
closeCart()
document.addEventListener("DOMContentLoaded", () => {
    renderGoods(laptops);

    const uniqueProcessor = new Set();
    const uniqueRam = new Set();
    const uniqueStorage = new Set();
    const uniqueDisplay = new Set();
    const uniqueGraphics = new Set();

    laptops.forEach(
        ({ specs: { processor, ram, storage, display, graphics } }) => {
            uniqueProcessor.add(processor);
            uniqueRam.add(ram);
            uniqueStorage.add(storage);
            uniqueDisplay.add(display);
            uniqueGraphics.add(graphics);
        }
    );
    renderSelect(Array.from(uniqueProcessor),
        document.getElementById("processorFilter"));
    renderSelect(Array.from(uniqueRam),
        document.getElementById("ramFilter"));
    renderSelect(Array.from(uniqueStorage),
        document.getElementById("storageFilter"));
    renderSelect(Array.from(uniqueDisplay),
        document.getElementById("displayFilter"));
    renderSelect(Array.from(uniqueGraphics),
        document.getElementById("graphicsFilter"));

    document.querySelectorAll("select").forEach((link) => {
        link.addEventListener("change", () => {
            filterGoods(laptops);
        });
    });
    document.getElementById("priceFilter").addEventListener("input", () => {
        document.getElementById("priceValue").textContent =
            document.getElementById("priceFilter").value;
        filterGoods(laptops);
    });

    document.querySelector('.goods_container').addEventListener('click', (e) => {
        if (e.target.classList.contains('buyBtn')) {
            const laptopName = e.target.closest('.card').querySelector('h3').textContent
            console.log(laptopName);
            const laptop = laptops.find(product => product.name === laptopName)
            console.log(laptop);
            addToCart.call(cart, laptop)
        }
    })
});