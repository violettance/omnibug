import test from "ava";
import DataroidProvider from "../source/providers/Dataroid.js";

test("Dataroid Provider", t => {
    let provider = new DataroidProvider();
    t.is(provider.key, "DATAROID");
    t.is(provider.name, "Dataroid");
    t.is(provider.type, "Analytics");
});

test("Dataroid Provider - URL Pattern Matching", t => {
    let provider = new DataroidProvider();
    
    // Test valid URLs
    t.true(provider.checkUrl("https://api.dataroid.com/collector/collect/event"));
    t.true(provider.checkUrl("https://api.dataroid.com/collector/collect/event?test=1"));
    t.true(provider.checkUrl("http://api.dataroid.com/collector/collect/event"));
    
    // Test invalid URLs
    t.false(provider.checkUrl("https://google-analytics.com/collect"));
    t.false(provider.checkUrl("https://api.dataroid.com/other/endpoint"));
    t.false(provider.checkUrl("https://other-dataroid.com/collector/collect/event"));
});

test("Dataroid Provider - Parse URL with POST Data", t => {
    let provider = new DataroidProvider();
    
    const testUrl = "https://api.dataroid.com/collector/collect/event";
    const testPostData = JSON.stringify({
        events: [{
            eventName: "page_view",
            eventId: "evt_123456",
            customerId: "cust_789",
            attributes: {
                url: "https://example.com/page",
                clientCreationDate: "2024-01-15T10:30:00Z",
                pageTitle: "Test Page",
                userAgent: "Mozilla/5.0...",
                viewport: "1920x1080"
            },
            clientSession: {
                sessionId: "sess_abc123",
                startDateTime: "2024-01-15T10:00:00Z"
            }
        }]
    });
    
    const result = provider.parseUrl(testUrl, testPostData);
    
    t.is(result.provider.name, "Dataroid");
    t.is(result.provider.key, "DATAROID");
    t.is(result.provider.type, "Analytics");
    
    // Check that we have data
    t.true(result.data.length > 0);
    
    // Check for specific fields
    const eventNameField = result.data.find(item => item.field === "Event Name");
    t.truthy(eventNameField);
    t.is(eventNameField.value, "page_view");
    
    const urlField = result.data.find(item => item.field === "Page URL");
    t.truthy(urlField);
    t.is(urlField.value, "https://example.com/page");
    
    const sessionIdField = result.data.find(item => item.field === "Session ID");
    t.truthy(sessionIdField);
    t.is(sessionIdField.value, "sess_abc123");
});

test("Dataroid Provider - Parse URL with Invalid POST Data", t => {
    let provider = new DataroidProvider();
    
    const testUrl = "https://api.dataroid.com/collector/collect/event";
    const invalidPostData = "invalid json";
    
    const result = provider.parseUrl(testUrl, invalidPostData);
    
    t.is(result.provider.name, "Dataroid");
    t.is(result.provider.key, "DATAROID");
    
    // Should still return some data (hostname, requestType)
    t.true(result.data.length > 0);
});

test("Dataroid Provider - Friendly Attribute Names", t => {
    let provider = new DataroidProvider();
    
    t.is(provider.getFriendlyAttributeName("pageTitle"), "Page Title");
    t.is(provider.getFriendlyAttributeName("userAgent"), "User Agent");
    t.is(provider.getFriendlyAttributeName("screenResolution"), "Screen Resolution");
    t.is(provider.getFriendlyAttributeName("customData"), "Custom Data");
    t.is(provider.getFriendlyAttributeName("unknownField"), "Unknown Field");
});

test("Dataroid Provider - Groups", t => {
    let provider = new DataroidProvider();
    const groups = provider.groups;
    
    t.is(groups.length, 4);
    t.is(groups[0].key, "general");
    t.is(groups[0].name, "General");
    t.is(groups[1].key, "event");
    t.is(groups[1].name, "Event Data");
    t.is(groups[2].key, "session");
    t.is(groups[2].name, "Session Data");
    t.is(groups[3].key, "attributes");
    t.is(groups[3].name, "Attributes");
});

test("Dataroid Provider - Column Mapping", t => {
    let provider = new DataroidProvider();
    const columnMapping = provider.columnMapping;
    
    t.is(columnMapping.account, "eventName");
    t.is(columnMapping.requestType, "requestType");
});
