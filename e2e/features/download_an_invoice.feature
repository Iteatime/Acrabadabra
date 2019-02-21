Feature: Download an invoice

In order to get an invoice
As a user
I click the download button

Scenario Outline: I can download the invoice
  When I download an invoice for witch the provider rcs exemption is <p-rcs>
  And the provider vat exemption is <p-vat>
  And the provider telephone number is <p-telephone>
  And the client rcs exemption is <c-rcs>
  And the client vat exemption is <c-vat>
  And the client telephone number is <c-telephone>
  And it is <worknd-days> working days
  And expenses are <expenses>
  And the banking details are <pay-details>
  And the payment late penalty is <pay-penalty>
  Then I should get an invoice <result>

  Exemples:
    | p-rcs | p-vat | p-telephone | c-rcs | c-vat | c-telephone| working-days | expenses| pay-details |  pay-penalty | result                     |
    | set   | set   | 0000000000  | set   | set   | 0000000000 | 15           | set     | set         |  set         | full featured              |
    | unset | set   | 0000000000  | set   | set   | 0000000000 | 15           | set     | set         |  set         | without provider rcs       |
    | set   | unset | 0000000000  | set   | set   | 0000000000 | 15           | set     | set         |  set         | duty free                  |
    | set   | set   | unset       | set   | set   | 0000000000 | 15           | set     | set         |  set         | without provider telephone |
    | set   | set   | 0000000000  | unset | set   | 0000000000 | 15           | set     | set         |  set         | without client rcs         |
    | set   | set   | 0000000000  | set   | unset | 0000000000 | 15           | set     | set         |  set         | without client vat number  |
    | set   | set   | 0000000000  | set   | set   | unset      | 15           | set     | set         |  set         | without client telephone   |
    | set   | set   | 0000000000  | set   | set   | 0000000000 | 0            | set     | set         |  set         | of expenses                |
    | set   | set   | 0000000000  | set   | set   | 0000000000 | 15           | unset   | set         |  set         | without expenses           |
    | set   | set   | 0000000000  | set   | set   | 0000000000 | 15           | set     | unset       |  set         | without banking details    |
    | set   | set   | 0000000000  | set   | set   | 0000000000 | 15           | set     | set         |  unset       | without pay penalty        |
