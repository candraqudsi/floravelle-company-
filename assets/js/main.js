
/* =================================
   FLORAVELLE JAVASCRIPT
================================= */

// 1. MOBILE NAVIGATION

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {

        const isOpen = navLinks.classList.toggle("show");

        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.innerHTML = isOpen ? "&times;" : "☰";
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", function () {
            navLinks.classList.remove("show");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.innerHTML = "☰";
        });
    });
}


// 2. FILTER PRODUK

const filterButtons = document.querySelectorAll(".filter-btn");
const galleryCards = document.querySelectorAll(".gallery-card");

filterButtons.forEach(button => {

    button.addEventListener("click", function () {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        this.classList.add("active");

        const selectedFilter = this.dataset.filter;

        galleryCards.forEach(card => {

            const category = card.dataset.category;

            if (
                selectedFilter === "all" ||
                category === selectedFilter
            ) {
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }

        });
    });
});


// 3. PEMESANAN DAN PEMBAYARAN

const orderForm = document.getElementById("orderForm");

if (orderForm) {

    const product = document.getElementById("product");
    const quantity = document.getElementById("quantity");
    const totalPrice = document.getElementById("totalPrice");
    const flowerType = document.getElementById("flowerType");
    const deliveryNote = document.getElementById("deliveryNote");

    // Format rupiah
    function rupiah(number) {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(number);
    }

    // Menghitung total harga
    function calculateTotal() {

        const price = Number(product.value) || 0;
        const amount = Number(quantity.value) || 0;

        const total = price * amount;

        totalPrice.textContent = rupiah(total);
    }

    product.addEventListener("change", calculateTotal);
    quantity.addEventListener("input", calculateTotal);

    // Rekomendasi jenis bunga
    flowerType.addEventListener("change", function () {

        if (flowerType.value === "Bunga Artificial") {

            deliveryNote.textContent =
                "✿ Pilihan tepat untuk pengiriman jarak jauh! " +
                "Bunga artificial tidak mudah layu selama perjalanan.";

        } else if (flowerType.value === "Bunga Asli") {

            deliveryNote.textContent =
                "♡ Bunga asli cocok untuk pengiriman dekat. " +
                "Pastikan waktu pengiriman dan penanganannya sesuai.";

        } else {

            deliveryNote.textContent =
                "✿ Pilih jenis bunga sesuai kebutuhan pengiriman.";

        }
    });

    // Membuat ringkasan pesanan
    orderForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const customer =
            document.getElementById("customer").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const address =
            document.getElementById("address").value.trim();

        const payment =
            document.getElementById("payment").value;

        const price = Number(product.value);
        const amount = Number(quantity.value);

        const selectedProduct =
            product.options[product.selectedIndex].text;

        const selectedFlower = flowerType.value;

        const total = price * amount;

        const orderResult =
            document.getElementById("orderResult");

        if (
            !customer ||
            !phone ||
            !address ||
            !price ||
            !amount ||
            amount < 1 ||
            amount > 100 ||
            !payment ||
            !selectedFlower
        ) {
            orderResult.textContent =
                "Mohon lengkapi seluruh data pemesanan.";

            return;
        }

        // Membuat ringkasan dengan aman
        const heading = document.createElement("h3");
        heading.textContent = "♡ Pesanan Berhasil Dibuat, terima kasih!";

        const details = [
            ["Nama", customer],
            ["WhatsApp", phone],
            ["Alamat", address],
            ["Produk", selectedProduct],
            ["Jenis bunga", selectedFlower],
            ["Jumlah", amount + " item"],
            ["Pembayaran", payment],
            ["Total", rupiah(total)]
        ];

        orderResult.replaceChildren(heading);

        details.forEach(([label, value]) => {
            const line = document.createElement("p");
            line.textContent = label + ": " + value;
            orderResult.appendChild(line);
        });

        const note = document.createElement("p");
        note.textContent =
            "Catatan: Ini merupakan simulasi pemesanan. " +
            "Belum ada transaksi atau pembayaran sungguhan.";

        note.style.marginTop = "12px";
        orderResult.appendChild(note);

        // Kembali ke kondisi awal
        orderResult.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        });

        orderForm.reset();
        calculateTotal();

        deliveryNote.textContent =
            "✿ Pilih jenis bunga sesuai kebutuhan pengiriman.";
    });

    calculateTotal();
}
