Feature: retirement saving calculator page

  @postivetest_TC
  Scenario Outline: Calculate retirement needs without maritial status and social security income 
    Given User open the retirement calculator page
    When user should enter the "<retirementData>"
    And user submit the form
    Then user should see the estimated retirement needs

    Examples:
      | retirementData |
      | validuser1     |

  @negative_TC
  Scenario Outline: Calculate retirement need with  using of invalid age credentials
    Given User open the retirement calculator page
    When user should enter the "<retirementData>"
    And user submit the form
    Then user can able to see the error messages in current age and ritrement age filed

    Examples:
      | retirementData    |
      | invalideage       |
      | invalideretireage |

  Scenario Outline: Calculate retirement needs with maritial status and social security income  
    Given User open the retirement calculator page
    When user should enter the "<retirementData>"
    Then user sholud click Social Security benefits and choose maritial status
    Then user should the enter the Social Security override amount
    And user submit the form
    Then user should see the estimated retirement needs

    Examples:
      | retirementData |
      | validuser2     |

  Scenario Outline: Calculate retirement needs single maritial status people
    Given User open the retirement calculator page
    When user should enter the "<retirementData>"
    Then user sholud click Social Security benefits and choose maritial status
    Then user should the enter the Social Security override amount
    And user submit the form
    Then user should see the estimated retirement needs

    Examples:
      | retirementData |
      | validuser3     |
