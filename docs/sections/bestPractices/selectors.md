# Best Practices - Selectors
> Related Topics: [Selectors](../features/selectors.md)

- Try to avoid text dependencies in selectors. Texts are more likely to change on the UI and if you want to enable your specs for LAT (Language Acceptance Tests) it will break your test. 

    !!! danger "avoid"
        === "UI5"
            ```js
            const selector = {
                "elementProperties": {
                    "viewName": "sap.suite.ui.generic.template.ObjectPage.view.Details",
                    "metadata": "sap.m.Button",
                    "text": "Create"
                }
            };
            ```

        === "non UI5"
            ```js
            const saveButton = await nonUi5.element.getElementByCss("BUTTON[text='Save']");
            ``` 

- Avoid *xPath* in non_ui5 selectors: *xPath* is a complex construct which includes multiple nodes. Due to the intransparent dependencies of other elements it may brake your test in case of any change of the corresponding elements. 

    !!! danger "avoid"
        ```js
        const elem1 = await nonUi5.element.getElementByXPath(".//*[@role='toolbar']/span[3]/span[2]/input");
        ``` 

- Avoid screen size specific and style dependent attributes of elements.  

    !!! danger "avoid"
        ```JavaScript
        [@style='width:100%;']
        ```

- Refrain from building manual xPaths at all costs. Indexes can change very easy if the path changes etc. 

    !!! danger "avoid"
        ```JavaScript
        const SupplierPartyId = childrenArray[5].getElementsByTagName("SPAN")[1].innerText;
        ```

- Always check for a stable IDs or for other unique properties/attributes. Even if Qmate Suite doesn't offer it to you.