# Poke Trackr
#### Video Demo:  https://www.youtube.com/watch?v=nyPWLIpgD_U
#### Description:

## Project Description
This project serves as a comprehensive solution for managing and tracking your Pokémon cards, designed as a final project for the CS50 course. With a user-friendly registration system, it enables users to seamlessly organize and monitor their Pokémon card collection. Leveraging data from the TGC Dex card database, the application offers an extensive list of cards for users to explore. The underlying database structure was initially designed using MYSQL Workbench and has been meticulously adapted for integration into this course project. Users can conveniently keep tabs on their cards and monitor their progress, making it a valuable tool for Pokémon card enthusiasts.

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