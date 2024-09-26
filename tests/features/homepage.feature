Feature: Playwright Home Page

    Scenario: Check title
        Given I am on the "Playwright_Home" Page
        When I click link "Get started"
        Then I see in title "Installation"
  