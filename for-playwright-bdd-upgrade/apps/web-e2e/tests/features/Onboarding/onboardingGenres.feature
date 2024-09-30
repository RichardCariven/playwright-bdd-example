@all
Feature: I can select Genres

    @overnight
    Scenario: Genres Page has all expected components
        Given I am on the "Select Genres" Page
        Then the text "Choose your genres" should be displayed
        And the text "Pick at least 3 to inspire what you see" should be displayed
        And the "Continue" button should be displayed
        And the "Continue" button should not be active

    Scenario: Continue is active when 3 genres are selected
        Given I am on the "Select Genres" Page
        When I check the "1980s genre" checkbox
        Then the "1980s genre" checkbox should be checked
        And the "Continue" button should not be active
        When I check the "Party genre" checkbox
        Then the "Party genre" checkbox should be checked
        And the "Continue" button should not be active
        When I check the "Musicals genre" checkbox
        Then the "Musicals genre" checkbox should be checked
        And the "Continue" button should be active
        When I uncheck the "Party genre" checkbox
        Then the "Party genre" checkbox should not be checked
        And the "Continue" button should not be active
        When I check the "Workout genre" checkbox
        Then the "Workout genre" checkbox should be checked
        And the "Continue" button should be active
        When I click the "Continue" button
        Then I am kept on the "Select Genres" Page

    @overnight
    Scenario: Genres Page has all expected Genres listed
        Given I am on the "Select Genres" Page
        #        todo get the list of Genres from the API and compare to whats on screen to save a static list
        Then the text should be visible on the page
            | 1980s        |
            | Pop          |
            | Dance        |
            | Party        |
            | Chill        |
            | Rap          |
            | Rock         |
            | Old Skool    |
            | Happy        |
            | R&B          |
            | Soul         |
            | Workout      |
            | 1990s        |
            | Dance Pop    |
            | Classic Rock |
            | 2000s        |
            | Indie        |
            | Love         |
            | Upbeat       |
            | 1970s        |
            | Garage       |
            | Jazz         |
            | Classical    |
            | Country      |
            | Musicals     |
            | LGBTQ+       |
            | 1960s        |
            | 2010s        |
            | Movies       |
            | Entertaining |
            | Afrobeats    |
