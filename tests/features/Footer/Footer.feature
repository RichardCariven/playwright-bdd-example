Feature: Footer has correct functionality

    @all
    Scenario: Footer Links are visible
        Given I am on the "Home" Page
        Then the "Terms and Conditions" link should be displayed
        Then the "Privacy Policy" link should be displayed
        And the "Speak Up" link should be displayed
        And the "Competition Terms & Conditions" link should be displayed
        And the "Cookie Policy" link should be displayed
        And the "Careers" link should be displayed
        And the "Support" link should be displayed
        And the "Advertise with us" link should be displayed

    @overnight
    @all
    Scenario Outline: Footer Links work as expected for <page> link
        Given I am on the "Home" Page
        When I click the "<page>" link
        Then the "<page>" page is opened in a new tab

        Examples:
            | page                           |
            | Terms and Conditions           |
            | Privacy Policy                 |
            | Speak Up                       |
            | Competition Terms & Conditions |
            | Cookie Policy                  |
            | Careers                        |
            | Support                        |
            | Advertise with us              |
