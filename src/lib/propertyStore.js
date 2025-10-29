// src/lib/propertyStore.js

const PROPERTY_CODE_KEY = "current:property:code";
const PROPERTIES_LIST_KEY = "properties:list";

/**
 * Get current property code from localStorage
 */
export function getCurrentPropertyCode() {
  try {
    return localStorage.getItem(PROPERTY_CODE_KEY) || "";
  } catch (error) {
    console.error("Error getting current property code:", error);
    return "";
  }
}

/**
 * Set current property code in localStorage
 */
export function setCurrentPropertyCode(code) {
  try {
    if (code) {
      localStorage.setItem(PROPERTY_CODE_KEY, code);
    } else {
      localStorage.removeItem(PROPERTY_CODE_KEY);
    }
  } catch (error) {
    console.error("Error setting current property code:", error);
  }
}

/**
 * Get list of properties from localStorage
 */
export function getStoredProperties() {
  try {
    const stored = localStorage.getItem(PROPERTIES_LIST_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error getting stored properties:", error);
    return [];
  }
}

/**
 * Store properties list in localStorage
 */
export function storeProperties(properties) {
  try {
    localStorage.setItem(PROPERTIES_LIST_KEY, JSON.stringify(properties));
  } catch (error) {
    console.error("Error storing properties:", error);
  }
}

/**
 * Fetch list of properties from API
 * Returns array of property objects: [{ code, name }, ...]
 */
export async function listMyProperties() {
  try {
    // Try to get from localStorage first
    const cached = getStoredProperties();
    
    // Import apiFetch dynamically to avoid circular dependency
    const { apiFetch } = await import("./api");
    
    // Fetch fresh data from API
    const response = await apiFetch("/properties/list");
    
    // Expected response format: { properties: [...] } or [...]
    const properties = Array.isArray(response) ? response : (response.properties || []);
    
    // Store in localStorage for offline access
    if (properties.length > 0) {
      storeProperties(properties);
    }
    
    return properties;
  } catch (error) {
    console.error("Error fetching properties list:", error);
    
    // Fallback to cached data if API fails
    const cached = getStoredProperties();
    if (cached.length > 0) {
      return cached;
    }
    
    // Return empty array if no cached data
    return [];
  }
}

/**
 * Clear all property-related data from localStorage
 */
export function clearPropertyStore() {
  try {
    localStorage.removeItem(PROPERTY_CODE_KEY);
    localStorage.removeItem(PROPERTIES_LIST_KEY);
  } catch (error) {
    console.error("Error clearing property store:", error);
  }
}

/**
 * Get property by code
 */
export function getPropertyByCode(code) {
  const properties = getStoredProperties();
  return properties.find(p => p.code === code) || null;
}

/**
 * Get current property details
 */
export function getCurrentProperty() {
  const code = getCurrentPropertyCode();
  return code ? getPropertyByCode(code) : null;
}

// }
