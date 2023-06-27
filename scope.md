#Projet Proposal

## MVP

- Add all product data in JSON format to Firebase
- Display the number of items in the cart
- Allows users to view what has been added to their cart.
    -Remove an item from the cart.
    -See the total price of all items.

## Wireframe

TK

### Pseudocode

## HTML/CSS

# Cart item number counter

    //Insert div with position absolute, with the cart icon as the relative reference. 
    //This div will contain the number of items inside the user's cart.

# Cart Icon

    // We want to be able to access this icon to open or close the cart app wherever we are on the page. To do this, we have to set the header nav bar to position fixed. 

# Cart 

    //Insert div for the cart.
    //Give the cart a width in px (maybe between 300-400px) so that the width stays the same when the page is resized. 
        //for mobile use, adjust the width accordingly. 
    //The cart is only on display when the cart icon is clicked. It exists, but it out of view. 
        //Create a transition here to slide the cart into view. 
    //When the cart is empty, display "Your cart is empty" message and continue shopping link only. 
    //When the cart is full, remove "Your cart is empty" and continue shopping link. 
        //Have a section (a ul) to render the products (li) to the cart, and another section to display the total price and a checkout btn. 
        //The products that are rendered to the cart are being added dynamically, which means they are not hardcoded into the HTML. We need to set up our JSON file with the product information and we need a section (ul) in the cart to append the products (li) to. 
    //Make sure to add a close icon to the cart app. When clicked, it will remove the cart app from the view. 

    //When the cart is full
    //Display a total price element and a checkout btn. 

## JS Functionality

# Open/exit cart

//Clicking on the cart icon is what will display the cart app on the page. 
//The first thing we need to do is target the cart icon and save it in a variable. 
//Next, we need to target the cart app and save it in a variable. 
//Add an event listener to the cart icon. On click, it should execute a function that will display(maybe toggle) the cart app into view. 
    //The empty cart should only display the close icon, "your cart is empty" message and continue shopping link. 
//To exit the cart, the user can toggle the cart icon, or the close icon or click anywhere outside the cart.  
    //To use the close icon, target it and save it in a variable.
        //attach an event listener. 
        //pass a function to make the cart disappear. 
        //Experiemnt with toggle, or variable.style.display = "none" or variable.classList.remove('.classname'). 

# Adding/removing product to/from the cart

//We have to give the add to cart button functionality. By clicking on this button, it makes the cart come into view.
//Target the add to cart button and save it in a variable. 
//We have to use the forEach method because we want all add to cart buttons to have the same functionality. 
//Attach an eventlister to the button. On click, it should execute function to make the cart come into view.
    //When an item is added to the cart,
        //append/render the products dynamically into an empty cart array. 
        //display the propduct's quantity to 1
        //in firebase, in the imported JSON, we want to update the properties inCart and quantity:
            //inCart: false to inCart: true
            //quanity: 0 to quantity: 1
        //the quantity should also reflect in the cart item number counter.
            //target the counter and save in a varible. 
    //Because the cart is no longer empty, remove "your cart is empty" message and continue shopping link.
    //Display the total price and the checkout btn. 

//When the items render to the cart, there should be +/- buttons to adjust the quantity of the products. 
// these buttons needs to be targetted and save in their own variables. 
    //event listeners need to be atacked. on click, they need to perform a function. 
// the quantity element also needs to be targeted and saved in a variable. We want this to display the new quantity if +/- buttons are used. 
//firebase should be listening. 
    // probably need to use onValue and update functions. 
//when the + button is clicked on, we want to increase the quantity by one and display the new quantity. 
    //this should also reflect in the cart item counter. 
//when the - button is clicked on, we want to decrease the quantity by one and display the new quantity. 
    //this should also reflect in the cart item counter.
    //if the quantity > 0, we want to set the new quantity to 0 because a user cannot purchase a negative quantity of products. 
    //When the quantity is equal to 0, we want to remove the product from the cart array.
//when the user click on the trash can icon, we want to remove the product from the array.
    //this should also reflect in the cart item counter.
    //firebase needs to be updated to reflect that the product is not in the cart and the quantity of that product is 0. 
//when the user removes all of the products from the cart,
    //display the "your cart is empty" and the continue shopping link. 

//If user clicks on add to cart button for product that already exist in the cart, we don't want to create a new li item for that. we want to add the quantity to the existing item and its quantity in the cart. 
    //this also needs to reflect in firebase and the cart item counter. 












    
    






