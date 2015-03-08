# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Answer.destroy_all
Answer.create(answers: ["x=1.5"], message: 'Success')
Answer.create(answers: ["a=[]"], message: 'Success')

