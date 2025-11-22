# Real Estate Analytics Pack Setup Guide

I have implemented a comprehensive tracking system for your website. Here is how to use and visualize the data.

## 1. What is being tracked?

### **Conversions (Leads)**
*   **Form Submissions**: Tracks when a user successfully submits the "Contact" or "Schedule Visit" form.
    *   Event Name: `generate_lead`
    *   Parameters: `conversion_type` ('form'), `event_label` ('Contact Form' or 'Schedule Visit Form')
*   **Phone Clicks**: Tracks when a user clicks on the phone number.
    *   Event Name: `generate_lead`
    *   Parameters: `conversion_type` ('call')
*   **Brochure Downloads**: Tracks when a user clicks "Download Brochure".
    *   Event Name: `file_download`

### **Engagement**
*   **Button Clicks**: Tracks clicks on key buttons like "Schedule Tour" in the Hero section or Navbar.
    *   Event Name: `button_click`
*   **Scroll Depth**: Tracks when a user scrolls to 25%, 50%, 75%, and 90% of the page.
    *   Event Name: `scroll_depth`

## 2. How to View Data in Google Analytics 4 (GA4)

### **Realtime View**
1.  Go to **Reports** > **Realtime**.
2.  Perform actions on your site (click buttons, scroll).
3.  You will see events like `button_click`, `scroll_depth`, and `generate_lead` appearing in the "Event count by Event name" card.

### **Custom Dashboard (Looker Studio)**
To create a professional Real Estate Dashboard:

1.  Go to [Looker Studio](https://lookerstudio.google.com/).
2.  Click **Create** > **Report**.
3.  Select **Google Analytics** as the data source.
4.  Choose your "Godrej Reserve" property.
5.  **Add Charts**:
    *   **Scorecards**: Total Users, Conversions (Leads).
    *   **Time Series**: Users over time.
    *   **Bar Chart**: Events by Event Name (to see breakdown of clicks vs scrolls).
    *   **Table**: Page path (to see which pages are most visited).

## 3. Search Console Linking (SEO Data)

To see organic search queries in GA4:

1.  Go to **Admin** (Gear icon in bottom left).
2.  Under **Product Links**, click **Search Console Links**.
3.  Click **Link**.
4.  Select your Search Console property (you must have verified your site in Google Search Console first).
5.  Click **Next** and **Submit**.

## 4. UTM Campaign Tracking

To track where your users are coming from (e.g., Facebook Ads, WhatsApp blasts):

Add parameters to your URL when sharing:
`https://godrejreserve.org.in/?utm_source=facebook&utm_medium=cpc&utm_campaign=summer_sale`

*   **utm_source**: The referrer (google, facebook, newsletter)
*   **utm_medium**: Marketing medium (cpc, banner, email)
*   **utm_campaign**: Product, promo code, or slogan (spring_sale)

GA4 automatically tracks these. View them in **Reports** > **Acquisition** > **Traffic acquisition**.
