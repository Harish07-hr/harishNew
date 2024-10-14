Feature: retirement saving calculator page

  @postivetest_TC
  Scenario Outline: Calculate retirement needs with marital status/single maritial status people and social security income
    Given User opens the retirement calculator page
    When User enters the "<retirementData>"
    And User submits the retirement calculator form
    Then User should see the estimated retirement needs

    Examples:
      | retirementData   |
      | validSingleUser  |
      | validMarriedUser |

  @negative_TC
  Scenario Outline: User checking the error message for retirement calculator with different set of invalid age data.
    Given User opens the retirement calculator page
    When User enters the "<retirementData>"
    And User submits the retirement calculator form
    Then user should see the error message for " currentAge|RetirementInvalid " fields

    Examples:
      | retirementData    |
      | invalideAge       |
      | invalideRetireage |

  Scenario Outline: Calculate retirement needs single marital status people
    Given User opens the retirement calculator page
    When User enters the "<retirementData>"
    Then User should click Social Security benefits and choose marital status
    Then User should enter the Social Security override amount
    And User submits the retirement calculator form
    Then User should see the estimated retirement needs

    Examples:
      | retirementData |
      | validUser      |

  Scenario: user selects social security option as enable on pre-retirement calculator page
    Given User opens the retirement calculator page
    When user selects social security field as "yes" on pre-retirement calculator
    Then user should "see" social security fields as visible

  Scenario: user selects social security option as disable on pre-retirement calculator page
    Given User opens the retirement calculator page
    When user selects social security field as "no" on pre-retirement calculator
    Then user should "not see" social security fields as visible
