### Lookbook with Hotspot Selection Feature

This documentation provides instructions to implement and test the **Lookbook Interactive Feature** for Shopify storefronts. The feature allows merchants to create an interactive image-based lookbook with customizable hotspots, making it easier for customers to explore products visually.

---

### Overview

The Lookbook Interactive Feature is built using **Liquid**, **JavaScript**, and **CSS**. It integrates seamlessly with the Shopify Theme Editor, allowing theme administrators to configure the background image, add interactive hotspots, and customize hotspot styles directly from the admin interface.

---

### Features

- **Customizable Hotspots**: 
  - Choose between CSS icons or custom SVGs.
  - Adjust colors, sizes, and symbols for CSS icons.
  - Dynamically display product details.
- **Responsive Design**: Optimized for desktop and mobile devices with customizable device targeting.
- **Intuitive Admin Controls**:
  - Add hotspots via the theme editor.
  - Configure position, styles, and linked products visually.
- **Dynamic Content Display**: Displays product details when a hotspot is clicked.

---

### Files

The feature consists of the following files:
- **Liquid**: Contains the schema and HTML for the lookbook and hotspots.
- **JavaScript**: Manages interactions, animations, and dynamic positioning of product details.
- **CSS**: Defines styles for hotspots, product detail cards, and responsive layouts.

---
### Configuration

The constructor in javascript accepts a configuration object to override default settings:

| Parameter                | Type    | Default  | Description                                                 |
|--------------------------|---------|----------|-------------------------------------------------------------|
| `cardMargin`             | Number  | `0.125`  | Relative margin between the card and hotspot.               |
| `mobileBreakpoint`       | Number  | `1024`   | Viewport width in pixels for switching to mobile behavior.  |
| `fadeDuration`           | Number  | `300`    | Duration (ms) for fade-in/out animations.                   |
| `zIndexActive`           | String  | `'10'`   | Z-index for the active product detail card.                 |
| `zIndexInactive`         | String  | `'0'`    | Z-index for the lookbook image when a product card is open. |
| `cardTopOffsetFactor`    | Number  | `0.6`    | Factor for vertical offset when the hotspot is near the top.|
| `cardBottomOffsetFactor` | Number  | `0.5`    | Factor for vertical offset when the hotspot is near the bottom.|
| `cardAdditionalOffsetFactor` | Number | `0.55` | Additional factor for adjusting the card’s vertical position.|

---
### Setup Instructions

1. **Add the Liquid File**:
   Place the provided Liquid code into the desired Shopify theme section. This code defines the schema and renders the lookbook with hotspots.

2. **Add JavaScript**:
   Save the provided JavaScript file in the `assets` folder of your theme and link it in the theme's layout file or directly in the section. 
(By default it is in the `lookbook.liquid` file)

   ```html
   <script src="{{ 'lookbook.js' | asset_url }}" defer></script>
   ```

3. **Add CSS**:
   Save the provided CSS file in the `assets` folder and link it in the same section. 
(By default it is in the `lookbook.liquid` file)

   ```html
   <link rel="stylesheet" href="{{ 'lookbook.css' | asset_url }}" />
   ```

4. **Configure in Theme Editor**:
   - Add a new **Lookbook** section to your Shopify theme.
   - Use the theme editor to configure the background image, hotspots, and their styles.

---

### Configuration in Theme Editor

#### **Section Settings**
| Setting               | Type       | Description                                                            |
|-----------------------|------------|------------------------------------------------------------------------|
| **Device**            | Select     | Target the lookbook for desktop, mobile, or both.                      |
| **Background Image**  | Image Picker | Upload an image for the lookbook background.                           |
| **Resize Image**      | Range      | Adjust the image width (percentage).                                   |

#### **Block Settings (Hotspots)**
| Setting               | Type       | Description                                                            |
|-----------------------|------------|------------------------------------------------------------------------|
| **Select Product**    | Product    | Link a product to the hotspot.                                         |
| **Icon Type**         | Select     | Choose between CSS icon or custom SVG for the hotspot.                 |
| **Hotspot X/Y Position** | Range    | Position the hotspot (percentage).                                     |
| **Custom SVG**        | Image Picker | Upload a custom SVG file for the hotspot.                             |
| **SVG Size**          | Range      | Adjust the size of the custom SVG.                                     |
| **CSS Icon Color**    | Color Picker | Set the color for CSS hotspots.                                       |
| **CSS Icon Size**     | Range      | Adjust the size of the CSS icon.                                       |
| **Include Symbol**    | Checkbox   | Enable or disable symbols inside CSS hotspots.                         |
| **Symbol**            | Text       | Define the symbol (e.g., "+") for CSS icons.                           |
| **Symbol Size**       | Range      | Adjust the size of the CSS icon's symbol.                              |

---

### Testing Instructions

#### **1. Hotspot Functionality**
- Add a hotspot and link a product.
- Verify clicking the hotspot displays:
  - The product image, title, price, and link dynamically.

#### **2. Positioning**
- Add multiple hotspots with different X/Y positions.
- Check that hotspots are positioned correctly on the background image.
- Test near the edges and ensure they don't overflow the viewport.

#### **3. Mobile Responsiveness**
- Resize the viewport below the breakpoint (default: 1024px).
- Verify the product detail card appears centered and displays correctly.

#### **4. SVG and CSS Icons**
- Test both SVG and CSS hotspot options.
- For CSS icons:
  - Change the color, size, and symbol.
  - Toggle the symbol on/off.
- For SVG icons:
  - Upload different SVGs and adjust their sizes.

#### **5. Closing Behavior**
- Test the close button to ensure it hides the product detail card.
- Click outside the card to ensure it also closes correctly.

---



### Debugging Tips

- **Hotspot Positioning**: Use browser developer tools to verify `top` and `left` styles.
- **Product Details**: Ensure products linked to hotspots have valid data (image, price, etc.).
- **Cross-Device Testing**: Test on multiple devices to confirm responsiveness.

---

### Customization Example

You can customize the script by modifying settings during initialization:

```javascript
new LookbookInteractive({
  cardMargin: 0.2,
  fadeDuration: 500,
  cardTopOffsetFactor: 0.7,
  cardBottomOffsetFactor: 0.4,
});
```
