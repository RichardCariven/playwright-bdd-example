Feature: Homepage has the correct Functionality

    @web
    Scenario: Menu bar is visible on web
        Given I am on the "Home" Page
        Then the "Home" link should be displayed
        Then the "On Air" link should be displayed
        And the "Music" link should be displayed
        And the "Podcasts" link should be displayed
        And the "News" link should be displayed
        And the "Win" link should be displayed
        And the "Premium" link should be displayed
        And the "Search" link should be displayed
        And the "My Library" link should be displayed
        And the "Profile Menu" dropdown should be displayed
        And the "Sign Out" link should not be displayed
        And the "Account Settings" link should not be displayed
        When I click the "Profile Menu" dropdown
        Then the "Sign Out" link should be displayed
        And the "Account Settings" link should be displayed

    #  @web
    #  @skip
    #  Scenario : Shows on Air is visible on the Home Page
    #    Given I am on the "Home" Page
    #    And I have retrieved the data from the "API name" API
    #    Then the "Shows on Air" Carousel should be displayed
    #    And the "Shows on Air" Carousel list should match the API list
    #    And the "Shows on Air" Carousel cards should contain the expected data (get the Data from the API in the step above
    #
    #  @web
    #  @skip
    #  Scenario: Clicking play in SHows on Air navigates the user to the right page
    #    Given I am on the "Home" Page
    #    When I click the PLay button on the "nth" card
    #    Then I should be on the Correct station page
    #
    #  @web
    #  @skip
    #  Scenario: Carousel behaves as expected
    #    Given I am on the "Home" Page
    #    And I have retrieved the data from the "API name" API
    #    Then the "Shows on Air" section should be displayed
    #    And the Carousel buttons should be displayed
    #    And the "Left Carousel" button should not be active
    #    And the "Right Carousel" button should be active
    #    When I click the "Right Carousel" button
    #    Then the "Left Carousel" button should be active
    #    When I click the "Right Carousel" button (step to click the number of stations taken from the API)
    #    Then the "Right Carousel" button should not be active
    @mobile
    Scenario: Menu bar is visible on mobile
        Given I am on the "Home" Page
        Then the "Home" link should be displayed
        And the "Search" link should be displayed
        And the "My Library" link should be displayed
        And the "Profile Menu" dropdown should be displayed
        When I click the "Profile Menu" dropdown
        Then the "Sign Out" link should be displayed
        And the "Account Settings" link should be displayed

    @mobile
    Scenario: Mobile Nav Menu
        Given I am on the "Home" Page
        When I click the "Expand Menu" dropdown
        Then the "Mobile Nav" menu should be displayed
        And the "Premium" link should be displayed
        And the "On Air" link should be displayed
        And the "Music" link should be displayed
        And the "Podcasts" link should be displayed
        And the "News" link should be displayed
        And the "Win" link should be displayed
        And the "Close Menu" button should be displayed
        When I click the "Close Menu" button
        Then the "Mobile Nav" menu should not be displayed
