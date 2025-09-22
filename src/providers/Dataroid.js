/**
 * Dataroid Analytics
 * https://dataroid.com/
 *
 * @class
 * @extends BaseProvider
 */
class DataroidProvider extends BaseProvider
{
    constructor()
    {
        super();
        this._key        = "DATAROID";
        this._pattern    = /api\.dataroid\.com.*\/collector\/collect\/event/;
        this._name       = "Dataroid";
        this._type       = "analytics";
        this._keywords   = ["dataroid", "analytics", "collector"];
        
        // Human-friendly field labels
        this.FIELD_LABELS = {
            eventName: "Event Name",
            eventId: "Event ID", 
            customerId: "Customer ID",
            url: "Page URL",
            clientCreationDate: "Client Creation Date",
            sessionId: "Session ID",
            sessionStart: "Session Start Time"
        };
    }

    /**
     * Convert attribute key to human-friendly name
     * 
     * @param {string} key - The attribute key
     * @return {string} - Human-friendly name
     */
    getFriendlyAttributeName(key)
    {
        const attributeMap = {
            "pageTitle": "Page Title",
            "pageType": "Page Type",
            "referrer": "Referrer",
            "userAgent": "User Agent",
            "viewport": "Viewport",
            "screenResolution": "Screen Resolution",
            "language": "Language",
            "timezone": "Timezone",
            "timestamp": "Timestamp",
            "userId": "User ID",
            "sessionDuration": "Session Duration",
            "pageLoadTime": "Page Load Time",
            "scrollDepth": "Scroll Depth",
            "clickCount": "Click Count",
            "formField": "Form Field",
            "buttonText": "Button Text",
            "linkText": "Link Text",
            "elementId": "Element ID",
            "elementClass": "Element Class",
            "customData": "Custom Data",
            "metadata": "Metadata"
        };
        
        return attributeMap[key] || key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1");
    }

    /**
     * Retrieve the column mappings for default columns (account, event type)
     *
     * @return {{}}
     */
    get columnMapping()
    {
        return {
            "account":      "eventName",
            "requestType":  "requestType"
        };
    }

    /**
     * Retrieve the group names & order
     *
     * @returns {*[]}
     */
    get groups()
    {
        return [
            {
                "key": "general",
                "name": "General"
            },
            {
                "key": "event",
                "name": "Event Data"
            },
            {
                "key": "session",
                "name": "Session Data"
            },
            {
                "key": "attributes",
                "name": "Attributes"
            }
        ];
    }

    /**
     * Get all of the available URL parameter keys
     *
     * @returns {{}}
     */
    get keys()
    {
        return {
            "eventName": {
                "name": "Event Name",
                "group": "event"
            },
            "eventId": {
                "name": "Event ID",
                "group": "event"
            },
            "url": {
                "name": "URL",
                "group": "attributes"
            },
            "clientCreationDate": {
                "name": "Client Creation Date",
                "group": "attributes"
            },
            "sessionId": {
                "name": "Session ID",
                "group": "session"
            },
            "startDateTime": {
                "name": "Session Start Date/Time",
                "group": "session"
            },
            "customerId": {
                "name": "Customer ID",
                "group": "general"
            },
            "requestType": {
                "hidden": true
            }
        };
    }

    /**
     * Parse any POST data into param key/value pairs
     *
     * @param postData
     * @return {Array|Object}
     */
    parsePostData(postData = "")
    {
        let params = [];
        if(typeof postData === "string" && postData)
        {
            try
            {
                let parsed = JSON.parse(postData);
                
                // Handle Dataroid's specific JSON structure
                if(parsed.events && Array.isArray(parsed.events) && parsed.events.length > 0)
                {
                    let event = parsed.events[0]; // Take the first event
                    
                    // Extract event-level data with human-friendly labels
                    if(event.eventName) {
                        params.push([this.FIELD_LABELS.eventName, event.eventName]);
                    }
                    if(event.eventId) {
                        params.push([this.FIELD_LABELS.eventId, event.eventId]);
                    }
                    if(event.customerId) {
                        params.push([this.FIELD_LABELS.customerId, event.customerId]);
                    }
                    
                    // Extract attributes - show all available attributes
                    if(event.attributes) {
                        // Always show URL and Client Creation Date with special labels
                        if(event.attributes.url) {
                            params.push([this.FIELD_LABELS.url, event.attributes.url]);
                        }
                        if(event.attributes.clientCreationDate) {
                            params.push([this.FIELD_LABELS.clientCreationDate, event.attributes.clientCreationDate]);
                        }
                        
                        // Show all other attributes as additional parameters
                        Object.keys(event.attributes).forEach(key => {
                            if(key !== "url" && key !== "clientCreationDate" && event.attributes[key] !== null && event.attributes[key] !== undefined) {
                                const friendlyKey = this.getFriendlyAttributeName(key);
                                params.push([friendlyKey, event.attributes[key]]);
                            }
                        });
                    }
                    
                    // Extract session data
                    if(event.clientSession) {
                        if(event.clientSession.sessionId) {
                            params.push([this.FIELD_LABELS.sessionId, event.clientSession.sessionId]);
                        }
                        if(event.clientSession.startDateTime) {
                            params.push([this.FIELD_LABELS.sessionStart, event.clientSession.startDateTime]);
                        }
                    }
                }
            }
            catch(e)
            {
                console.error("Dataroid postData is not valid JSON", e.message);
            }
        }
        else if(typeof postData === "object" && postData)
        {
            // Form data type
            Object.entries(postData).forEach((entry) => {
                params.push([entry[0], entry[1].toString()]);
            });
        }
        return params;
    }

    /**
     * Parse custom properties for a given URL
     *
     * @param    {string}   url
     * @param    {object}   params
     *
     * @returns {Array}
     */
    handleCustom(url, params)
    {
        let results = [];

        results.push({
            "key":    "omnibug_hostname",
            "value":  url.hostname,
            "field":  "Dataroid Host",
            "group":  "general"
        });

        results.push({
            "key":    "requestType",
            "value":  "Event Collection",
            "hidden": true
        });

        return results;
    }
}
