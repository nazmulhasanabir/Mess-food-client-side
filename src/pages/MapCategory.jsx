
import MealCart from './MealCart/MealCart';

const MapCategory = ({item}) => {
  console.log(item);
    return (
        <div>
             <div className="grid md:grid-cols-3 gap-10">
            {item.map((items) => (
              <MealCart  key={items._id} items={items}></MealCart>
            ))}
          </div>
        </div>
    );
};

export default MapCategory;