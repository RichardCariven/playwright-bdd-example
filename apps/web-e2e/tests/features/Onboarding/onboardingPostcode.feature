@all
Feature: I can enter my postcode as part of onboarding

    @overnight
    Scenario: Location Page has all expected components
        Given I am on the "Onboarding Location" Page
        Then the "Postcode Entry" field should be displayed
        Then the "Continue" button should be displayed
        And the "Continue" button should be active
        And the "Skip" link should be displayed
        And the text "Would you like to share your location?" should be displayed
        And the text "Find your local stations" should be displayed
        And the text "Find all your favourite local stations and content based on your postcode" should be displayed
        And the text "Relevant content" should be displayed
        And the text "Listen to news, weather, traffic updates, and more based on your postcode" should be displayed
        And the text "Update postcode" should be displayed
        And the text "You can change this anytime in settings" should be displayed

    Scenario Outline: Enter a Valid Postcode <testcase>
        Given I am on the "Onboarding Location" Page
        And I fill in the "Postcode Entry" input with "<postcode>"
        When I click the "Continue" button
        Then I am directed to the "Select Genres" Page

        Examples:
            | postcode | testcase           |
            | W1F 9DJ  | space in postcode  |
            | W1F9DJ   | uppercase no space |
            | w1f9dj   | lowercase no space |

    Scenario Outline: Enter an Invalid Postcode <testcase>
        Given I am on the "Onboarding Location" Page
        And I fill in the "Postcode Entry" input with "<invalidpostcode>"
        Then I should see the error message "Postcode not recognised. Double-check and try again."
        When I click the "Continue" button
        Then I am kept on the "Onboarding Location" Page
        And I fill in the "Postcode Entry" input with "<validpostcode>"
        When I click the "Continue" button
        Then I am directed to the "Select Genres" Page

        Examples:
            | invalidpostcode | validpostcode | testcase       |
            | W1F             | W1F9DJ        | invalid format |

        @fail
        Examples:
            | invalidpostcode | validpostcode | testcase         |
            |                 | W1F9DJ        | missing postcode |

    Scenario: Skip Postcode screen with no postcode entered
        Given I am on the "Onboarding Location" Page
        When I click the "Skip" button
        Then I am directed to the "Select Genres" Page

    Scenario: Skip Postcode screen with valid postcode entered
        Given I am on the "Onboarding Location" Page
        And I fill in the "Postcode Entry" input with "W1F9DJ"
        And I click the "Skip" button
        Then I am directed to the "Select Genres" Page

    Scenario: Skip Postcode screen with Invalid postcode entered
        Given I am on the "Onboarding Location" Page
        And I fill in the "Postcode Entry" input with "W1F"
        And I click the "Skip" button
        Then I am directed to the "Select Genres" Page
