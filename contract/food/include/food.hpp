#include <eosio/eosio.hpp>
#include <eosio/print.hpp>
#include <eosio/asset.hpp>
#include <eosio/system.hpp>

using namespace std;
using namespace eosio;

class [[eosio::contract("food")]] food : public contract {
    public:
        using contract::contract;

        food(name receiver, name code, datastream<const char *> ds):contract(receiver, code, ds), hodl_symbol("EOS", 4){}
        //contructor
        [[eosio::on_notify("eosio.token::transfer")]]
        void deposit(name hodler, name to, eosio::asset quantity, std::string memo);

        [[eosio::action]]
        void withdraw(name hodler, int64_t quantity);

        [[eosio::action]] void newfacility(name user, uint64_t id, string _name, string type, string email, string phone_number, string location, string website);
        [[eosio::action]] void delfacility(name user);
        [[eosio::action]] void clearfacilit();

        [[eosio::action]] void newproduct(uint64_t facility_id, uint64_t id, string _name, string avatar, string description);
        [[eosio::action]] void delproduct(uint64_t id);
        [[eosio::action]] void updproduct(uint64_t id, string _name, string avatar, string description);
        [[eosio::action]] void clearproduct();

        [[eosio::action]] void newpitem(uint64_t id, uint64_t productId, uint64_t price, uint64_t fromProductItemId, int64_t expiryDate);
        [[eosio::action]] void delproitem(uint64_t id);
        [[eosio::action]] void clearpitem();

        [[eosio::action]] void newproimage(uint64_t id, uint64_t productId, string ipfsHash);
        [[eosio::action]] void delproimage(uint64_t id);
        [[eosio::action]] void delproimages(uint64_t productId);

        [[eosio::action]] void newevent(const uint64_t id, const uint64_t productItemId, const string _name, const int64_t createdAt, const uint64_t fromFacilityId, const uint64_t toFacilityId, const uint64_t deliveredByFacilityId, const int64_t soldAt, const uint64_t fromProductItemId, const uint64_t toProductItemId, const int32_t quality, const vector<uint64_t>& productItemIds);
        [[eosio::action]] void clearevent();

        [[eosio::action]] void newratting(uint64_t id, uint64_t productId, string content, uint64_t star, name owner, int64_t stakeAmount);
        [[eosio::action]] void clearratting();
        [[eosio::action]] void delratting(uint64_t id);

        [[eosio::action]] void likerat(name owner, uint64_t rattingId, int64_t stakeAmount);
        [[eosio::action]] void delvoterat(name owner, uint64_t rattingId);
        [[eosio::action]] void dislikerat(name owner, uint64_t rattingId, int64_t stakeAmount);
        [[eosio::action]] void clearvotrat();
    private:
        const symbol hodl_symbol;

        struct [[eosio::table]] balance
        {
            eosio::asset funds;
            uint64_t primary_key() const { return funds.symbol.raw(); }
        };
        using balance_table = eosio::multi_index<"balance"_n, balance>;

        struct [[eosio::table]] facility {
            name      user;
            uint64_t  id;
            string    _name;
            string    type;
            string    email;
            string    phone_number;
            string    location;
            string    website;
            auto      primary_key() const { return user.value; }
            uint64_t  by_id() const {return id; }
        };
        typedef multi_index<"facility"_n, facility, eosio::indexed_by<"id"_n, eosio::const_mem_fun<facility, uint64_t, &facility::by_id>>> facility_table;

        struct [[eosio::table]] product {
            uint64_t  id;
            string    _name;
            uint64_t  facility_id;
            string    avatar;
            string    description;
            auto      primary_key() const { return id; }
            uint64_t  by_facility_id() const {return facility_id; }
        };
        typedef multi_index<"product"_n, product, eosio::indexed_by<"facilityid"_n, eosio::const_mem_fun<product, uint64_t, &product::by_facility_id>>> product_table;

        struct [[eosio::table]] productitem {
            uint64_t  id;
            uint64_t  productId;
            uint64_t  price;
            name      owner;
            uint64_t  fromProductItemId;
            int64_t   expiryDate;
            auto      primary_key() const { return id; }
            uint64_t  by_productId() const {return productId; }
            uint64_t  by_owner() const {return owner.value; }
            uint64_t  by_fromProductItemId() const {return fromProductItemId; }
        };
        typedef multi_index<"productitem"_n, productitem,
            eosio::indexed_by<"productid"_n, eosio::const_mem_fun<productitem, uint64_t, &productitem::by_productId>>,
            eosio::indexed_by<"owner"_n, eosio::const_mem_fun<productitem, uint64_t, &productitem::by_owner>>,
            eosio::indexed_by<"frompitemid"_n, eosio::const_mem_fun<productitem, uint64_t, &productitem::by_fromProductItemId>>
        > productitem_table;

        struct [[eosio::table]] event {
            uint64_t         id;
            uint64_t         productItemId;
            string           _name;
            int64_t          createdAt;
            uint64_t         fromFacilityId; // delivery
            uint64_t         toFacilityId; // delivery
            uint64_t         deliveredByFacilityId; // delivery
            int64_t          soldAt;
            uint64_t         fromProductItemId;
            uint64_t         toProductItemId;
            int32_t          quality;
            vector<uint64_t> productItemIds; // aggregation

            auto     primary_key() const { return id; }
            uint64_t by_productItemId() const {return productItemId; }
            uint64_t by_fromFacilityId() const {return fromFacilityId; }
            uint64_t by_toFacilityId() const {return toFacilityId; }
            uint64_t by_fromProductItemId() const {return fromProductItemId; }
            uint64_t by_toProductItemId() const {return toProductItemId; }
        };
        typedef multi_index<"event"_n, event,
            eosio::indexed_by<"pitemid"_n, eosio::const_mem_fun<event, uint64_t, &event::by_productItemId>>,
            eosio::indexed_by<"fromfacid"_n, eosio::const_mem_fun<event, uint64_t, &event::by_fromFacilityId>>,
            eosio::indexed_by<"tofacid"_n, eosio::const_mem_fun<event, uint64_t, &event::by_toFacilityId>>,
            eosio::indexed_by<"frompitemid"_n, eosio::const_mem_fun<event, uint64_t, &event::by_fromProductItemId>>,
            eosio::indexed_by<"topitemid"_n, eosio::const_mem_fun<event, uint64_t, &event::by_toProductItemId>>
        > event_table;

        struct [[eosio::table]] ratting {
            uint64_t     id;
            uint64_t     productId;
            string       content;
            name         owner;
            uint64_t     star;
            eosio::asset stake;
            auto         primary_key() const { return id; }
            uint64_t     by_owner() const { return owner.value; }
            uint64_t     by_productId() const { return productId; }
        };
        using ratting_table = eosio::multi_index<"ratting"_n, ratting,
            eosio::indexed_by<"owner"_n, eosio::const_mem_fun<ratting, uint64_t, &ratting::by_owner>>,
            eosio::indexed_by<"productid"_n, eosio::const_mem_fun<ratting, uint64_t, &ratting::by_productId>>
        >;

        static uint128_t combine_ids(const uint64_t &x, const uint64_t &y)
        {
            return (uint128_t{x} << 64) | (y);
        }
        struct [[eosio::table]] voteratting {
            uint64_t     id;
            uint64_t     rattingId;
            name         owner;
            int8_t       like;
            eosio::asset stake;
            auto         primary_key() const { return id; }
            uint128_t    by_userRatting() const { return combine_ids(rattingId, owner.value); }
            uint64_t     by_rattingId() const { return rattingId; }
            uint64_t     by_owner() const { return owner.value; }
        };
        using voteratting_table = eosio::multi_index<"voteratting"_n, voteratting,
            eosio::indexed_by<"rattingid"_n, eosio::const_mem_fun<voteratting, uint64_t, &voteratting::by_rattingId>>,
            eosio::indexed_by<"owner"_n, eosio::const_mem_fun<voteratting, uint64_t, &voteratting::by_owner>>,
            eosio::indexed_by<"userratting"_n, eosio::const_mem_fun<voteratting, uint128_t, &voteratting::by_userRatting>>
        >;

        struct [[eosio::table]] productimage {
            uint64_t     id;
            string       imageId;
            uint64_t     productId;
            auto         primary_key() const { return id; }
            uint64_t     by_productId() const { return productId; }
        };
        using productimage_table = eosio::multi_index<"productimage"_n, productimage,
            eosio::indexed_by<"productid"_n, eosio::const_mem_fun<productimage, uint64_t, &productimage::by_productId>>
        >;
};
