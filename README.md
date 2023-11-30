# Poke Trackr
#### Video Demo:  https://www.youtube.com/watch?v=nyPWLIpgD_U
#### Description:

## Project Description
This project is your go-to companion for effortlessly managing and keeping tabs on your expanding Pokémon card collection. Picture it as your sidekick, specially crafted for the grand finale of the CS50 course. We've crafted an intuitive and user-friendly experience, ensuring you can seamlessly organize and monitor your Pokémon cards. The secret sauce? The TGC Dex card database, which provides an extensive list of cards for you to explore and enjoy.

Behind the scenes, we've employed MYSQL Workbench to create a robust database, the unsung hero that powers the entire operation. Adding a dash of style is TailwindCSS, a tool I've sworn by for years, bringing a material design aesthetic to the components (even though we admit there might be a bit of inconsistency).

What sets this project apart is its commitment to user engagement and progress tracking. Imagine being able to check in on your cards, monitor your completion status, and gain valuable insights into your collection. It's not just a project; it's an indispensable tool for Pokémon card enthusiasts. Whether you're stepping into the captivating world of Pokémon Trading Card Game (TCG) for the first time or seeking a sophisticated solution for managing an extensive collection, this project stands as a testament to the fusion of technology and passion in the realm of Pokémon card collecting. It's our way of making your Pokémon journey even more exciting and tech-savvy.

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