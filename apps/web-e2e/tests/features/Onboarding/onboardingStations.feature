@all
Feature: I can select Stations as part of onboarding

    @overnight
    Scenario: Stations Page has all expected components
        Given I am on the "Select Favourite Stations" Page
        Then the text "Choose your stations" should be displayed
        And the text "Pick as many stations as you want." should be displayed
        And the text "Popular Stations" should be displayed
        Then the "Continue" button should be displayed
        And the "Continue" button should be active

    Scenario: Stations can be ticked and unticked
        Given I am on the "Select Favourite Stations" Page
        When I check the "Absolute Radio 60s" checkbox
        Then the "Absolute Radio 60s" checkbox should be checked
        And the "Continue" button should be active
        When I uncheck the "Absolute Radio 60s" checkbox
        Then the "Absolute Radio 60s" checkbox should not be checked
        And the "Continue" button should be active

    @overnight
    @fail
    Scenario: Station Page has all expected Stations listed
        Given I am on the "Select Favourite Stations" Page
        Then the text should be visible on the page
            | Absolute Radio         |
            | Absolute Radio 60s     |
            | Absolute Radio 70s     |
            | Absolute 80s           |
            | Absolute Radio 90s     |
            | Absolute Radio 00s     |
            | Absolute Radio 10s     |
            | Absolute Radio 20s     |
            | Absolute Classic Rock  |
            | Absolute Radio Country |
            | Clyde 1                |
            | Greatest Hits Radio    |
            | heat Radio             |
            | Hits Radio             |
            | Hits Radio Pride       |
            | Jazz FM                |
            | Kerrang! Radio         |
            | KISS                   |
            | KISSTORY               |
            | KISS FRESH             |
            | KISS DANCE             |
            | KISS GARAGE            |
            | Magic Radio            |
            | Magic Soul             |
            | KISS BLISS             |
            | Magic Chilled          |
            | Mellow Magic           |
            | Magic at the Musicals  |
            | Magic at the Movies    |
            | Planet Rock            |
            | Scala Radio            |
