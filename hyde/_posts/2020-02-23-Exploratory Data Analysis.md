---
layout: post
title: Exploratory Data Analysis
description: >
  The first chapter of practical statistics for data scientists

excerpt_separator: <!--more-->
---

Lots of information in the world is unstructured. Pictrues are sets of RGB data and words are sets of random alphabets.
The most important thing in the data science is to convert these raw data to data which can be utilized.
There are two types of data, numeric and categorical.
numeric : continuous, discrete
categorical : 'Categorical data takes only a fixed set of values'. Binary is a special case of categorical data. ordinal Data

"KEY TERMS FOR RECTANGULAR DATA Data frame
Rectangular data (like a spreadsheet) is the basic data structure for statistical and machine learning models.
Feature A column in the table is commonly referred to as a feature. Synonyms attribute, input, predictor, variable
Outcome
Many data science projects involve predicting an outcome — often a yes/no outcome (in Table 11, it is “auction was competitive or not”). The features are sometimes used to predict the outcome in an experiment or study.
Synonyms dependent variable, response, target, output
Records A row in the table is commonly referred to as a record. Synonyms case, example, instance, observation, pattern, sample"

Rectangular data is essentially a two-dimensional matrix with rows indicating records (cases) and columns indicating features (variables).


TERMINOLOGY DIFFERENCES
Terminology for rectangular data can be confusing. Statisticians and data scientists use different terms for the same thing. For a statistician, predictor variables are used in a model to predict a response or dependent variable. For a data scientist, features are used to predict a target. One synonym is particularly confusing: computer scientists will use the term sample for a single row; a sample to a statistician means a collection of rows.

Nonrectangular Data Structures
Time series data records successive measurements of the same variable


In this book, we willl mainly deal wtih rectangular data.

데이터를 살펴보는 가장 기초적 단계
피쳐의 대푯값(typical value)를 구하는 것.

Mean : The sum of all values divided by the number of values.(average)
Weighted mean : The sum of all values times a weight divided by the sum of the weights. (weighted average)
Median : The value such that one-half of the data lies above and below. (50th percentile)
Weighted median : The value such that one-half of the sum of the weights lies above and below the sorted data.
Trimmed mean : The average of all values after dropping a fixed number of extreme values. (truncated mean)
Robust Not sensitive to extreme values. (resistant)
Outlier : A data value that is very different from most of the data.(extreme value)

mean :

Trimmed mean : A trimmed mean eliminates the influence of extreme values
