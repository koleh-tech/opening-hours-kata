# opening-hours-kata

Amy and Valerie, the shop owners, need you to develop a simple program that satisfies the following requirements:


- The opening days and hours of the shop need to be configurable, and can be scattered in the week (e.g. Mon, Wed, Fri from 08:00 to 16:00)
- Amy needs to display the date of the next opening on a billboard outside of the shop
- Amy also wants to display on the website of the shop whether it is opened or closed at the moment

Write a small module that follows this contract, so that Valerie can easily integrate it:

```
OpeningHours.isOpenOn(date)
OpeningHours.nextOpeningDate(date)
```


## test cases

You can use the following test cases to get started:

```
Shop opening days: Mon, Wed, Fri
Shop opening hours: 08:00 - 16:00

wednesday = '2016-05-11T12:22:11.824Z'
thursday = '2016-05-12T12:22:11.824Z'
fridayMorning = '2016-05-13T08:00:00.000Z'

OpeningHours.isOpenOn(wednesday) == true
OpeningHours.isOpenOn(thursday) == false

OpeningHours.nextOpeningDate(wednesday) === fridayMorning
```


