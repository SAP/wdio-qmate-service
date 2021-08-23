Feature: Vyper WDIO Reuse API (click)

  Scenario Outline: Confirmation dialog

    Given I am on opened confirmation dialog
    When I click <button> on confirmation dialog
    Then I should check that no confirmation dialog any more, error message is <message>

    Examples:
      | button | message                      |
      | Yes    | No visible elements found    |
      | No     | No visible elements found    |
