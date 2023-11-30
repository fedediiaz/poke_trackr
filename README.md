# Poke Trackr
#### Video Demo:  https://www.youtube.com/watch?v=nyPWLIpgD_U
#### Description:

## Project Description
This project is like your trusty sidekick for managing and keeping track of all your Pokémon cards. Think of it as the ultimate tool designed for the final stretch of the CS50 course. We've made sure it's super user-friendly, allowing you to effortlessly sort and watch over your growing Pokémon card collection. Plus, it's got all the details you need, thanks to the TGC Dex card database.

We've worked some behind-the-scenes magic using MYSQL Workbench to set up the database. It's the digital brain that helps everything run smoothly. TailwindCSS, a tool I've been a fan of for years, adds a touch of style with a material design flair, though I'll admit, we're still working on nailing down that consistent look.

What makes this project special is how it keeps you in the loop about your cards. You can easily check in on them, see how close you are to completing your collection, and get some insights into your card-collecting journey. It's a must-have for Pokémon card fans, whether you're just starting with the Trading Card Game or you're a seasoned collector. This project is our way of blending tech and passion to make Pokémon card collecting even more awesome.

Features:
- User registration system
- Lists cards from [TGC Dex](https://github.com/tcgdex/cards-database)
- Database was design using MYSQL Workbench and adapted for this course
- Users can keep track of their cards and progress

## How to Run the Project
Important note: this project uses python 3.9 as a base.

1. **Clone the Repository:**
```bash
git clone <repository_url>
cd <project_directory>
```

2. Set Up Virtual Environment
```bash
python -m venv venv
source venv/bin/activate
```

3. Install Dependencies:
```bash
pip install -r requirements.txt
```

4. Run the Application:
```bash
python run.py
```