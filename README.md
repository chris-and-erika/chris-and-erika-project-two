# Juno College Cohort 49 - Project 1

## The objective: 

Convert a static multi-page PSD* using HTML and CSS into a well-tested, accessible, responsive and pixel-perfect website for desktop and mobile. Site must responsive all the way down to 320px, and mobile view should provide good user experience.  

*The design and assets were provided by Juno College. 

## Technical challenges: 
- ~~SVGs not loading despite changing fill color.~~ SOLVED by applying width to svgs. 
- ~~SVG colors are off. Look over properties that need to be leveraged.~~ SOLVED simply by styling in CSS annd changing some SVG values in html. 
- ~~Box-shadow for nav not showing.~~ SOLVED by applying position: relative to nav. Shadow was initally rendering beneath the hero div. 
- ~~Box 7 in shop section disappears when resizing browser.~~ SOLVED by removing flex-wrap property from ul and leveraging two ul instead of one. Box 7 wasn't actually disappearing. Flex-wrap was creating a space issue between containers when resizing browser. 
- ~~Updated border for product containers but cannot close space between image container and product info container in shop.~~ SOLVED by setting font-size: 0 to image container.
- ~~Footer logo not given in the right color. Is there a way to change the color of a png?~~ SOLVED using CSS filter generator found at https://codepen.io/sosuke/pen/Pjoqqp and then tinkering with brightness value. 
- ~~Bottom footer content alignment not perfect.~~ SOLVED by creating a container for col2-4 with a set height and leveraging flex properties. 

## Technical wins: 
- Both HTML and CSS for initial draft of desktop landing page completed in under 24hours.
- Leveraged mixins to keep SCSS short and sweet.  
- Learned how to apply a parallax effect.
- Learned how to create movement for static images with zoom-in-and-out hover effect. 
- All technical challenges (seen above) that were solved. 

## To improve:
- ~~Reassess btn styling mixins and determine if there is another way to create DRYer code.~~ 
- ~~Refine details of overall landing page.~~
- ~~Create more consistency with font styling.~~ 
- ~~Look over mixins and look for new mixin and/or resuseable code opportunities.~~ 
- ~~Revisit SVGs. Make sure you can figure it out how to use them before using FA fonts. Using FA fonts would only be to keep the HTML code shorter.~~
- ~~Revisit bottom of footer alignment issue.~~
- Time permitting, create a branch to see how you would go about the project the second time around. 

## To do:
- ~~Organize your animations.~~
- ~~Create hover effects for links.~~ 
- ~~Fix copyright.~~
- ~~Create hover effect for buttons.~~ 
- ~~Add alt text to images.~~
- ~~Insert FA script to head and add FA hamburger menu (for mediaQs).~~ 
- ~~Create contact page, but finalize the landing page before proceeding.~~
- ~~Landing page media queries for multiple devices, all the way down to 320px.~~ 
- ~~Contact page media queries for multiple devices, all the way down to 320px.~~
- ~~Upload to Netlify.~~
- ~~Seperate SCSS into partials.~~ 
- Experiment with animations and transitions in a seperate branch.
-FIX CART BUG
-FIX ABOUT SECTION BUG

## Design liberties taken: 

- Created parallax effect in header section to create fluidity. 
- Added zoom-in-zoom-out hover effect to gallery images to make section less static. 

## Design liberties to consider:

- Consider adding a background color similar to header image or another image to shop section to break up the sections. All white feels like a never-ending scroll. 
- Add to Card btn placement on container border is very strange. Was it designed this way on purpose? Maybe consider putting it inside the text container with everything else. 
- ~~Consider adding more spacing between footer image and footer content. On larger screens, the content spills into the image footer and makes the text unlegible.~~



