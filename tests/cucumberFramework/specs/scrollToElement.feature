Feature: Vyper WDIO Reuse API (scrolling)

  Scenario Outline: Navigate to SAP demo app page and scroll

    Given I am on <intent> page
    When I scroll to an element with index <index>, timeout <timeout> and alignment <alignment>
    Then I should see an element

    Examples:
      | intent     | index | timeout | alignment |
      | categories | 0     | 3000    | start     |
