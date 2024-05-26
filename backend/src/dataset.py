import pandas as pd # pip install pandas

DATASET = pd.read_excel('../database/perfume_database_cluster.xlsx', 
                   usecols=['brand', 
                            'perfume', 
                            'notes', 
                            'longevity', 
                            'sillage', 
                            'gender', 
                            'Age Group', 
                            'Occasion', 
                            'Season',
                            'cluster'])