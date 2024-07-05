use('women_dress_onlineShop');

db.createCollection('products');

// db.products.insertMany(
//     [ 
//         {
//             imgSrc: "https://images.unsplash.com/photo-1548611535-b3716767c3d6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    
//             id: 0,
//             category: "Casule",
//             title: "Off Shoulder Sweater",
//             price: 187,
//             popularity: 5,
//             rating: 4.5,
//             date: "2023-05-01",
//             dress_sizes: [ "XL", "L", "M", "S", "XS" ],
//             dress_colors: [ "red-500", "green-500", "black", "yellow-500", "white" ],
//             reviews:{
    
//             }
    
//         },
//         {
//             imgSrc: "https://images.unsplash.com/photo-1513094735237-8f2714d57c13?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    
//             id: 1,
//             category: "Work & Office",
//             title: "Timeless Classic Collection",
//             price: 149,
//             popularity: 7,
//             rating: 5,
//             date: "2023-08-01",
//             dress_sizes: [ "L", "M", "S", "XS" ],
//             dress_colors: [ "red-500", "green-500", "[#213380]", "white" ],
//             reviews:{
                
//             }
//         },
//         {
//             imgSrc: "https://images.unsplash.com/photo-1552874869-5c39ec9288dc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    
//             id: 2,
//             category: "Casule & Elegent",
//             title: "Long Sleeved Top",
//             price: 127,
//             popularity: 4,
//             rating: 4.5,
//             date: "2024-02-04",
//             dress_sizes: [ "XL", "L", "M", "S", "XS" ],
//             dress_colors: [ "black", "white" ],
//             reviews:{
                
//             }
//         },
//         {
//             imgSrc: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    
//             id: 3,
//             category: "Formal",
//             title: "Office Style",
//             price: 238.76,
//             popularity: 4,
//             rating: 4,
//             date: "2023-02-21",
//             dress_sizes: [ "XL", "L", "M", "S", "XS" ],
//             dress_colors: [ "black", "white" , "amber-800", "[#141E46]" ],
//             reviews:{
                
//             }
//         },
//         {
//             imgSrc: "https://images.unsplash.com/photo-1606902965551-dce093cda6e7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    
//             id: 4,
//             category: "Activewear",
//             title: "Relaxed Fit Joggers",
//             price: 109.99,
//             popularity: 8,
//             rating: 5,
//             date: "2024-03-15",
//             dress_sizes: [],
//             dress_colors: [],
//             reviews:{
                
//             }
//         },
//         {
//             imgSrc: "https://images.unsplash.com/photo-1600275669177-176b3c586d22?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    
//             id: 5,
//             category: "Work & Office",
//             title: "Professional Pinstripe Blazer",
//             price: 250.00,
//             popularity: 4.8,
//             rating: 4.8,
//             date: "2023-12-27",
//             dress_sizes: [],
//             dress_colors: [],
//             reviews:{
                
//             }
//         },
//         {
//             imgSrc: "https://images.unsplash.com/photo-1672710028050-c5c683da5ca1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    
//             id: 6,
//             category: "Evening Dresses",
//             title: "Urban Chic Ensemble",
//             price: 224.95,
//             popularity: 9,
//             rating: 4.7,
//             date: "2023-09-17",
//             dress_sizes: [],
//             dress_colors: [],
//             reviews:{
                
//             }
//         },
//         {
//             imgSrc: "https://images.unsplash.com/photo-1621338215802-e04cfd0b298d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    
//             id: 7,
//             category: "Activewear",
//             title: "Weekend Wanderlust Wardrobee",
//             price: 119.95,
//             popularity: 9,
//             rating: 4.7,
//             date: "2023-09-17",
//             dress_sizes: [],
//             dress_colors: [],
//             reviews:{
                
//             }
//         },
//         {
//             imgSrc: "https://images.unsplash.com/photo-1528228377194-2faca82540e4?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    
//             id: 9,
//             category: "Activewear",
//             title: "jeans jacket ",
//             price: 143.85,
//             popularity: 9,
//             rating: 6.7,
//             date: "2023-09-27",
//             dress_sizes: [],
//             dress_colors: [],
//             reviews:{
                
//             }
//         },
//         {
//             imgSrc: "https://plus.unsplash.com/premium_photo-1673957802750-0cc6d052c6d9?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    
//             id: 10,
//             category: "Casule & Elegent",
//             title: "Jeans & Shirt",
//             price: 243.00,
//             popularity: 9,
//             rating: 6.7,
//             date: "2023-09-27",
//             dress_sizes: [],
//             dress_colors: [],
//             reviews:{
                
//             }
//         }
//     ]
// );

db.products.updateMany({ reviews: {} }, { $set: { reviews: [] } });