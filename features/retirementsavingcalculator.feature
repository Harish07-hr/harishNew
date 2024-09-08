Feature: retirement saving calculator page

  @postivetest_TC
  Scenario Outline: Calculate retirement needs without maritial status and social security income
    Given User opens the retirement calculator page
    When User enters the "<retirementData>"
    When User submits the retirement calculator form
    Then User should see the estimated retirement needs

    Examples:
      | retirementData |
      | validuser1     |

 @negative_TC
  Scenario Outline: Calculate retirement need with  using of invalid age credentials
    Given User opens the retirement calculator page
    When User enters the "<retirementData>"
    When User submits the retirement calculator form
    Then User should see the error messages in current age and retirement age fields

    Examples:
      | retirementData    |
      | invalideage       |
      | invalideretireage |

  Scenario Outline: Calculate retirement needs with maritial status and social security income
    Given User opens the retirement calculator page
    When User enters the "<retirementData>"
    Then User should click Social Security benefits and choose marital status
    Then User should enter the Social Security override amount
    When User submits the retirement calculator form
    Then User should see the estimated retirement needs

    Examples:
      | retirementData |
      | validuser2     |

  Scenario Outline: Calculate retirement needs single maritial status people
    Given User opens the retirement calculator page
    When User enters the "<retirementData>"
    Then User should click Social Security benefits and choose marital status
    Then User should enter the Social Security override amount
    When User submits the retirement calculator form
    Then User should see the estimated retirement needs

    Examples:
      | retirementData |
      | validuser3     |