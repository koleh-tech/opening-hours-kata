# An implementation of the [opening hours kata](https://github.com/christian-fei/opening-hours-kata) in TypeScript

## Motivation

I wanted to practice driving feature development with [Text based Approval testing](https://github.com/approvals/Approvals.NodeJS)
and fewer unit tests. This project also gave a feel for how well that workflow integrates with frontend development,
specifically, [Vite](https://vite.dev/) + [React](https://react.dev/).

One advantage of this approach is that approval data, readable by non devs, is stored in:
[approved-behavior/](https://github.com/koleh-tech/opening-hours-kata/tree/main/approved-behavior)

## Getting started

Install the dependencies, and check that basic tooling works:

```{bash}
npm ci
npm run lint
npm run build
```

Run tests in hot reload mode (best to leave this running in a separate window all the time):

```{bash}
npm run test
```

Run vite in hot reload mode:

```{bash}
npm run dev
```

### Viewing approval test differences

For my Linux development environment , I found [Kompare](https://apps.kde.org/kompare/) to be the
best easiest / quickest diff tool to work with. For your preffered environment, see the Node Approvals docs for supported diff tools.

## Kata description:

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
