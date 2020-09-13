#include <food.hpp>

void food::deposit(name hodler, name to, eosio::asset quantity, std::string memo){
    if (hodler == get_self() || to != get_self())
    {
        return;
    }

    check(quantity.amount > 0, "When pigs fly");
    check(quantity.symbol == hodl_symbol, "These are not the droids you are looking for.");

    balance_table balance(get_self(), hodler.value);
    auto hodl_it = balance.find(hodl_symbol.raw());

    if (hodl_it != balance.end())
        balance.modify(hodl_it, get_self(), [&](auto &row) {
            row.funds += quantity;
        });
    else
        balance.emplace(get_self(), [&](auto &row) {
            row.funds = quantity;
        });
}

void food::withdraw(name hodler, int64_t quantity){
    //Check the authority of hodlder
    require_auth(hodler);

    balance_table balance(get_self(), hodler.value);
    auto hodl_it = balance.find(hodl_symbol.raw());

    //Make sure the holder is in the table
    check(hodl_it != balance.end(), "You're not allowed to withdraw");

    check(hodl_it->funds.amount >= quantity, "Your balance is not enough");

    eosio::asset w(quantity, hodl_symbol);

    action{
        permission_level{get_self(), "active"_n},
        "eosio.token"_n,
        "transfer"_n,
        std::make_tuple(get_self(), hodler, w, std::string("Party! Your hodl is free."))
    }.send();

    balance.modify(hodl_it, get_self(), [&](auto &row) {
        row.funds -= w;
    });
}

void food::newfacility(name user, uint64_t id, string _name, string type, string email, string phone_number, string location, string website) {
    require_auth(get_self());

    facility_table facilities(get_self(), get_self().value);

    auto facilities_index = facilities.get_index<"id"_n>();
    auto iter = facilities_index.find(id);
    eosio::check(iter == facilities_index.end(), "Account already registered");

    facilities.emplace(get_self(), [&](auto &facility) {
        facility.user = user;
        facility.id = id;
        facility._name = _name;
        facility.type = type;
        facility.email = email;
        facility.phone_number = phone_number;
        facility.location = location;
        facility.website = website;
	});
}

void food::delfacility(name user) {
    require_auth(get_self());

    // get facilitiy by user
    facility_table facilities(get_self(), get_self().value);
    auto iterfac = facilities.find(user.value);

    facilities.erase(iterfac);
}

void food::clearfacilit() {
  require_auth(get_self());

  facility_table facilities(get_self(), get_self().value);

  // Delete all records in facilities table
  auto itr = facilities.begin();
  while (itr != facilities.end()) {
    itr = facilities.erase(itr);
  }
}

void food::newproduct(uint64_t facility_id, uint64_t id, string _name, string avatar, string description) {
    // check user has registered as facility
    facility_table facilities(get_self(), get_self().value);
    auto facilities_index = facilities.get_index<"id"_n>();
    auto iter = facilities_index.find(facility_id);
    eosio::check(iter != facilities_index.end(), "Account has not registered as facility yet");

    require_auth(iter->user);

    // save product
    product_table products(get_self(), get_self().value);
    products.emplace(iter->user, [&](auto &product) {
        product.id = id;
        product._name = _name;
        product.facility_id = facility_id;
        product.avatar = avatar;
        product.description = description;
	});
}

void food::newproimage(uint64_t id, uint64_t productId, string ipfsHash) {
    // check product has exist
    product_table products(get_self(), get_self().value);
    auto iterpro = products.find(productId);
    eosio::check(iterpro != products.end(), "Product is not exist");

    // check user has registered as facility
    facility_table facilities(get_self(), get_self().value);
    auto facilities_index = facilities.get_index<"id"_n>();
    auto iterfac = facilities_index.find(iterpro->facility_id);
    eosio::check(iterfac != facilities_index.end(), "Account has not registered as facility yet");

    require_auth(iterfac->user);

    // save db
    productimage_table productimages(get_self(), get_self().value);
    productimages.emplace(iterfac->user, [&](auto &productimg) {
        productimg.id = id;
        productimg.imageId = ipfsHash;
        productimg.productId = productId;
	});
}

void food::delproimage(uint64_t id) {
    // del images
    productimage_table productimages(get_self(), get_self().value);
    auto iterimg = productimages.find(id);
    eosio::check(iterimg != productimages.end(), "Image is not exist");

    // check product has exist
    product_table products(get_self(), get_self().value);
    auto iterpro = products.find(iterimg->productId);
    eosio::check(iterpro != products.end(), "Product is not exist");

    // check user has registered as facility
    facility_table facilities(get_self(), get_self().value);
    auto facilities_index = facilities.get_index<"id"_n>();
    auto iterfac = facilities_index.find(iterpro->facility_id);
    eosio::check(iterfac != facilities_index.end(), "Account has not registered as facility yet");

    require_auth(iterfac->user);

    productimages.erase(iterimg);
}

void food::delproimages(uint64_t productId) {
    // check product has exist
    product_table products(get_self(), get_self().value);
    auto iterpro = products.find(productId);
    eosio::check(iterpro != products.end(), "Product is not exist");

    // check user has registered as facility
    facility_table facilities(get_self(), get_self().value);
    auto facilities_index = facilities.get_index<"id"_n>();
    auto iterfac = facilities_index.find(iterpro->facility_id);
    eosio::check(iterfac != facilities_index.end(), "Account has not registered as facility yet");

    require_auth(iterfac->user);

    // del images
    productimage_table productimages(get_self(), get_self().value);
    auto productimages_index = productimages.get_index<"productid"_n>();
    auto iterimg = productimages_index.find(productId);
    while (iterimg != productimages_index.end()) {
        productimages_index.erase(iterimg);
        iterimg = productimages_index.find(productId);
    }
}

void food::delproduct(uint64_t id) {
    // get product by id
    product_table products(get_self(), get_self().value);
    auto iterpro = products.find(id);

    // get facility to auth
    facility_table facilities(get_self(), get_self().value);
    auto facilities_index = facilities.get_index<"id"_n>();
    auto iterfac = facilities_index.find(iterpro->facility_id);

    require_auth(iterfac->user);

    products.erase(iterpro);
}

void food::updproduct(uint64_t id, string _name, string avatar, string description) {
    // get product by id
    product_table products(get_self(), get_self().value);
    auto iterpro = products.find(id);

    // get facility to auth
    facility_table facilities(get_self(), get_self().value);
    auto facilities_index = facilities.get_index<"id"_n>();
    auto iterfac = facilities_index.find(iterpro->facility_id);

    require_auth(iterfac->user);

    products.modify(iterpro, iterfac->user, [&](auto &product) {
        if (_name != "")
            product._name = _name;
        
        if (avatar != "")
            product.avatar = avatar;
        
        if (description != "")
            product.description = description;
	});
}

void food::clearproduct() {
    require_auth(get_self());

    product_table products(get_self(), get_self().value);

    // Delete all records in products table
    auto itrP = products.begin();
    while (itrP != products.end()) {
        itrP = products.erase(itrP);
    }
}

void food::newpitem(uint64_t id, uint64_t productId, uint64_t price, uint64_t fromProductItemId, int64_t expiryDate) {
    // check product has exist
    product_table products(get_self(), get_self().value);
    auto iterpro = products.find(productId);
    eosio::check(iterpro != products.end(), "Product is not exist");

    // check user has registered as facility
    facility_table facilities(get_self(), get_self().value);
    auto facilities_index = facilities.get_index<"id"_n>();
    auto iterfac = facilities_index.find(iterpro->facility_id);
    eosio::check(iterfac != facilities_index.end(), "Account has not registered as facility yet");

    require_auth(iterfac->user);

    // save productitem
    productitem_table productitems(get_self(), get_self().value);
    productitems.emplace(iterfac->user, [&](auto &productitem) {
        productitem.id = id;
        productitem.productId = productId;
        productitem.price = price;
        productitem.owner = iterfac->user;
        productitem.fromProductItemId = fromProductItemId;
        productitem.expiryDate = expiryDate;
	});
}

void food::delproitem(uint64_t id) {
    // get product item by id
    productitem_table productitems(get_self(), get_self().value);
    auto iterpitem = productitems.find(id);

    // get product by id
    product_table products(get_self(), get_self().value);
    auto iterpro = products.find(iterpitem->productId);

    // get facility to auth
    facility_table facilities(get_self(), get_self().value);
    auto facilities_index = facilities.get_index<"id"_n>();
    auto iterfac = facilities_index.find(iterpro->facility_id);

    require_auth(iterfac->user);

    productitems.erase(iterpitem);
}

void food::clearpitem() {
    require_auth(get_self());

    productitem_table productitems(get_self(), get_self().value);

    // Delete all records in productitems table
    auto itr = productitems.begin();
    while (itr != productitems.end()) {
        itr = productitems.erase(itr);
    }
}

void food::newevent(const uint64_t id, const uint64_t productItemId, const string _name, const int64_t createdAt, const uint64_t fromFacilityId, const uint64_t toFacilityId, const uint64_t deliveredByFacilityId, const int64_t soldAt, const uint64_t fromProductItemId, const uint64_t toProductItemId, const int32_t quality, const vector<uint64_t>& productItemIds) {
    productitem_table productitems(get_self(), get_self().value);
    auto iterpitem = productitems.find(productItemId);
    eosio::check(iterpitem != productitems.end(), "Product item is not exist");

    require_auth(iterpitem->owner);

    // save event
    event_table events(get_self(), get_self().value);
    events.emplace(iterpitem->owner, [&](auto &event) {
        event.id = id;
        event.productItemId = productItemId;
        event._name = _name;
        event.createdAt = createdAt;
        event.fromFacilityId = fromFacilityId;
        event.toFacilityId = toFacilityId;
        event.deliveredByFacilityId = deliveredByFacilityId;
        event.soldAt = soldAt;
        event.fromProductItemId = fromProductItemId;
        event.toProductItemId = toProductItemId;
        event.quality = quality;
        event.productItemIds = productItemIds;
	});

    // update owner of product_item
    uint64_t newOwnerID = -1;
    if (_name == "START_DELIVERY"){
        newOwnerID = deliveredByFacilityId;
    } else if (_name == "FINISH_DELIVERY"){
        newOwnerID = toFacilityId;
    }
    if(newOwnerID != -1){
        facility_table facilities(get_self(), get_self().value);
        auto facilities_index = facilities.get_index<"id"_n>();
        auto iterfac = facilities_index.find(newOwnerID);
        eosio::check(iterfac != facilities_index.end(), "Facility is not exist");

        productitems.modify(iterpitem, iterpitem->owner, [&](auto &iterpitem) {
            iterpitem.owner = iterfac->user;
        });
    }
}

void food::clearevent() {
    require_auth(get_self());

    event_table events(get_self(), get_self().value);

    // Delete all records in events table
    auto itr = events.begin();
    while (itr != events.end()) {
        itr = events.erase(itr);
    }
}

void food::newratting(uint64_t id, uint64_t productId, string content, uint64_t star, name owner, int64_t stakeAmount) {
    require_auth(owner);

    // check product is exist
    product_table products(get_self(), get_self().value);
    auto iterpro = products.find(productId);
    check(iterpro != products.end(), "product is not exist");

    // sub balance
    balance_table balance(get_self(), owner.value);
    auto hodl_it = balance.find(hodl_symbol.raw());
    check(hodl_it->funds.amount >= stakeAmount, "Your balance is not enough");

    eosio::asset w(stakeAmount, hodl_symbol);

    // create if not exist
    if (hodl_it->funds.amount == stakeAmount) {
        balance.erase(hodl_it);
    } else {
        balance.modify(hodl_it, get_self(), [&](auto &row) {
            row.funds -= w;
        });
    }

    // add ratting
    if (star > 4)
        star = 4;
    
    ratting_table rattings(get_self(), get_self().value);
    rattings.emplace(owner, [&](auto &ratting) {
        ratting.id = id;
        ratting.productId = productId;
        ratting.content = content;
        ratting.star = star;
        ratting.owner = owner;
        ratting.stake = w;
	});
}

void food::clearratting() {
    require_auth(get_self());

    ratting_table rattings(get_self(), get_self().value);

    // Delete all records in rattings table
    auto itr = rattings.begin();
    while (itr != rattings.end()) {
        itr = rattings.erase(itr);
    }
}

void food::delratting(uint64_t id) {
    // get ratting by id
    ratting_table rattings(get_self(), get_self().value);
    auto itercom = rattings.find(id);

    require_auth(itercom->owner);

    // recover balance
    balance_table balance(get_self(), itercom->owner.value);
    auto hodl_it = balance.find(hodl_symbol.raw());

    if (hodl_it != balance.end())
        balance.modify(hodl_it, get_self(), [&](auto &row) {
            row.funds += itercom->stake;
        });
    else
        balance.emplace(get_self(), [&](auto &row) {
            row.funds = itercom->stake;
        });

    rattings.erase(itercom);
}

void food::likerat(name owner, uint64_t rattingId, int64_t stakeAmount) {
    // get ratting by id
    ratting_table rattings(get_self(), get_self().value);
    auto iterrat = rattings.find(rattingId);
    check(iterrat != rattings.end(), "ratting is not exist");

    require_auth(owner);

    // check balance
    balance_table balance(get_self(), owner.value);
    auto hodl_it = balance.find(hodl_symbol.raw());

    // check has liked before
    uint128_t groupId = combine_ids(rattingId, owner.value);

    voteratting_table voterattings(get_self(), get_self().value);
    auto voterattings_index = voterattings.get_index<"userratting"_n>();
    auto itervorat = voterattings_index.find(groupId);

    if (itervorat != voterattings_index.end()){
        check(itervorat->like != 1, "this user has already liked");

        check(hodl_it->funds.amount + itervorat->stake.amount >= stakeAmount, "Your balance is not enough");
        eosio::asset assetSubBalance(stakeAmount - itervorat->stake.amount, hodl_symbol);
        eosio::asset assetVote(stakeAmount, hodl_symbol);
        balance.modify(hodl_it, get_self(), [&](auto &row) {
            row.funds -= assetSubBalance;
        });

        voterattings_index.modify(itervorat, owner, [&](auto &voteratting) {
            voteratting.like = 1;
            voteratting.stake = assetVote;
        });
    } else {
        check(hodl_it->funds.amount >= stakeAmount, "Your balance is not enough");
        eosio::asset assetVote(stakeAmount, hodl_symbol);
        balance.modify(hodl_it, get_self(), [&](auto &row) {
            row.funds -= assetVote;
        });

        auto size = std::distance(voterattings.cbegin(),voterattings.cend());
        voterattings.emplace(owner, [&](auto &voteratting) {
            voteratting.id = size;
            voteratting.rattingId = rattingId;
            voteratting.owner = owner;
            voteratting.like = 1;
            voteratting.stake = assetVote;
        });
    }
}

void food::dislikerat(name owner, uint64_t rattingId, int64_t stakeAmount) {
    // get ratting by id
    ratting_table rattings(get_self(), get_self().value);
    auto iterrat = rattings.find(rattingId);
    check(iterrat != rattings.end(), "ratting is not exist");

    require_auth(owner);

    // check balance
    balance_table balance(get_self(), owner.value);
    auto hodl_it = balance.find(hodl_symbol.raw());

    // check has disliked before
    uint128_t groupId = combine_ids(rattingId, owner.value);

    voteratting_table voterattings(get_self(), get_self().value);
    auto voterattings_index = voterattings.get_index<"userratting"_n>();
    auto itervorat = voterattings_index.find(groupId);

    if (itervorat != voterattings_index.end()){
        check(itervorat->like != -1, "this user has already liked");

        check(hodl_it->funds.amount + itervorat->stake.amount >= stakeAmount, "Your balance is not enough");
        eosio::asset assetSubBalance(stakeAmount - itervorat->stake.amount, hodl_symbol);
        eosio::asset assetVote(stakeAmount, hodl_symbol);
        balance.modify(hodl_it, get_self(), [&](auto &row) {
            row.funds -= assetSubBalance;
        });

        voterattings_index.modify(itervorat, owner, [&](auto &voteratting) {
            voteratting.like = -1;
            voteratting.stake = assetVote;
        });
    } else {
        check(hodl_it->funds.amount >= stakeAmount, "Your balance is not enough");
        eosio::asset assetVote(stakeAmount, hodl_symbol);
        balance.modify(hodl_it, get_self(), [&](auto &row) {
            row.funds -= assetVote;
        });

        auto size = std::distance(voterattings.cbegin(),voterattings.cend());
        voterattings.emplace(owner, [&](auto &voteratting) {
            voteratting.id = size;
            voteratting.rattingId = rattingId;
            voteratting.owner = owner;
            voteratting.like = -1;
            voteratting.stake = assetVote;
        });
    }
}

void food::clearvotrat() {
    require_auth(get_self());

    voteratting_table voterattings(get_self(), get_self().value);

    // Delete all records in rattings table
    auto itr = voterattings.begin();
    while (itr != voterattings.end()) {
        itr = voterattings.erase(itr);
    }
}

void food::delvoterat(name owner, uint64_t rattingId) {
    // get voteratting by id
    uint128_t groupId = combine_ids(rattingId, owner.value);
    voteratting_table voterattings(get_self(), get_self().value);
    auto voterattings_index = voterattings.get_index<"userratting"_n>();
    auto itervorat = voterattings_index.find(groupId);

    require_auth(itervorat->owner);

    // recover balance
    balance_table balance(get_self(), itervorat->owner.value);
    auto hodl_it = balance.find(hodl_symbol.raw());

    if (hodl_it != balance.end())
        balance.modify(hodl_it, get_self(), [&](auto &row) {
            row.funds += itervorat->stake;
        });
    else
        balance.emplace(get_self(), [&](auto &row) {
            row.funds = itervorat->stake;
        });

    voterattings_index.erase(itervorat);
}