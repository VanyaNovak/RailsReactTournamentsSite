# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


9.times do |i|
    Tournament.create(
        name: "Tournament #{ i + 1 }",
        team: '5 vs 5',
        description: 'Dreamhack junior tournament',
        image: "https://steamcdn-a.akamaihd.net/apps/csgo/blog/images/brokenfang/brokenfang_premier.png?v=2"
    )
end