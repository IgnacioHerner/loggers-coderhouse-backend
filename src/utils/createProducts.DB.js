import productsModel from "../dao/models/product.model.js";

export const createProductDB = async () => {
    const existingProducts = await productsModel.countDocuments()
    if(!existingProducts) {
        const products = await productsModel.insertMany([
            {
                title: "Lebron James",
                description:"Camiseta Los Angeles Lakers Nike",
                price: 4999,
                status: true,
                code: "AKJ2K1",
                stock: 10,
                category: "Camiseta",
                thumbnail: "https://images.footballfanatics.com/los-angeles-lakers/los-angeles-lakers-nike-icon-edition-swingman-jersey-gold-lebron-james-unisex_ss4_p-13348378+u-fp3otbq191kx828hrd1i+v-5a9c2d0539404bff8535dc183e58a4f2.jpg?_hv=2&w=900",
            },
            {
                title: "Stephen Curry ",
                description:"Camiseta Golden State Warriors Nike",
                price: 4999,
                status: true,
                code: "AD6FSG",
                stock: 10,
                category: "Camiseta",
                thumbnail: "https://images.footballfanatics.com/golden-state-warriors/golden-state-warriors-nike-association-edition-swingman-jersey-white-stephen-curry-unisex_ss4_p-13348801+u-5k7hzqykx13ib75dknin+v-48661c059d8a43bcb09268072750902a.jpg?_hv=2&w=900",
            },
            {
                title: "Jimmy Butler",
                description:"Camiseta Miami Heat Jordan Statement Edition",
                price: 4999,
                status: true,
                code: "AXCB55",
                stock: 10,
                category: "Camiseta",
                thumbnail: "https://images.footballfanatics.com/miami-heat/miami-heat-jordan-statement-edition-swingman-jersey-red-jimmy-butler-unisex_ss4_p-13365072+u-gippfentzzpnbqqfu1dl+v-bac1e1f715ff493abc2ec2007811c3f2.jpg?_hv=2&w=900",
            },
            {
                title: "Nikola Jokić",
                description:"Camiseta Nike Icon Edition Swingman de los Denver Nuggets",
                price: 4999,
                status: true,
                code: "64QWER",
                stock: 10,
                category: "Camiseta",
                thumbnail: "https://images.footballfanatics.com/denver-nuggets/denver-nuggets-nike-icon-edition-swingman-jersey-navy-nikola-jokic-unisex_ss4_p-13349315+u-1cmc9ye1pcuis3sapt5v+v-3e199b813a0641a8bb2270399331eb36.jpg?_hv=2&w=900",
            },
            {
                title: "Giannis Antetokounmpo",
                description:"Camiseta Milwaukee Bucks Jordan Statement Edition",
                price: 4999,
                status: true,
                code: "K56FHA",
                stock: 10,
                category: "Camiseta",
                thumbnail: "https://images.footballfanatics.com/milwaukee-bucks/milwaukee-bucks-jordan-statement-edition-swingman-jersey-black-giannis-antetokounmpo-unisex_ss4_p-13365107+u-lnb0jqoc3lavokjfin0j+v-32a1fb591be144f99a6f8c1aada1ce5e.jpg?_hv=2&w=900",
            },
            {
                title: "Jayson Tatum",
                description:"Camiseta Boston Celtics Jordan Statement",
                price: 4999,
                status: true,
                code: "Y65YRT",
                stock: 10,
                category: "Camiseta",
                thumbnail: "https://images.footballfanatics.com/boston-celtics/boston-celtics-jordan-statement-edition-swingman-jersey-green-jayson-tatum-unisex_ss4_p-13365084+u-1fpm6z601nn5bxb5ab9p+v-3c740b3052264fc4ac40004da35d98ea.jpg?_hv=2&w=900",
            },
            {
                title: "Luka Doncic",
                description:"Dallas Mavericks Nike Icon Swingman Jersey",
                price: 4999,
                status: true,
                code: "U6Y4RT",
                stock: 10,
                category: "Camiseta",
                thumbnail: "https://images.footballfanatics.com/dallas-mavericks/dallas-mavericks-nike-icon-edition-swingman-jersey-blue-luka-doncic-mens_ss4_p-11972427+u-8j7ryb5ye24e5alq6ej0+v-ee1e2d09e4824d84943b05151da50781.jpg?_hv=2&w=900",
            },
        ])
    }
}